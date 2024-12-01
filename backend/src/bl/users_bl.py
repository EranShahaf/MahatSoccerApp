from typing import Annotated, Any, List, Tuple
from fastapi import Depends, HTTPException, status
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException
from dal import MysqlConnector
from sqlalchemy import select
from modals import User, UserCreate, UserUpdate, UserResponse, TokenData
import jwt
import logging
from security import (
    get_password_hash,
    verify_password,
    oauth2_scheme,
    SECRET_KEY,
    ALGORITHM
)

logger = logging.getLogger("uvicorn")

class UsersBL:        
    def create_user(self, user_create: UserCreate) -> UserResponse:
        user = user_create.model_dump()
        user['hashed_password'] = get_password_hash(user_create.password)
        
        user = User(**user)
        
        with MysqlConnector() as mysql_conn:
            mysql_conn.create_user(user)
            mysql_conn.commit()
            mysql_conn.refresh(user)
        
        return UserResponse.model_validate(user)

    def get_users(self, skip: int = 0, limit: int = 100) -> List[UserResponse]:
        with MysqlConnector() as mysql_conn:
            users = mysql_conn.get_users(skip, limit)
        
        return [UserResponse.model_validate(user) for user in users]
    
    def get_user_by_id(self, id: int) -> UserResponse:
        with MysqlConnector() as mysql_conn:
            user = mysql_conn.get_user_by_id(id)
        
        return UserResponse.model_validate(user)
    
    def update_user(self, user_id: int, user_update: UserUpdate) -> UserResponse:
        with MysqlConnector() as mysql_conn:
            user = mysql_conn.update_user(user_id, user_update)
            mysql_conn.commit()
            mysql_conn.refresh(user)
        
        return UserResponse.model_validate(user)
    
    def delete_user_by_id(self, user_id: int) -> UserResponse:
        with MysqlConnector() as mysql_conn:
            user = mysql_conn.delete_user_by_id(user_id)
            mysql_conn.commit()
        
        return user    
    
    def authenticate_user(self, username: str, password: str) -> UserResponse:
        with MysqlConnector() as mysql_conn:
            user = mysql_conn.get_user_by_username(username)
        wrong_username = False
        wrong_password = False
        
        if not user:
            wrong_username = True
        
        if not verify_password(password, user.hashed_password):
            wrong_password = True
        
        if wrong_username or wrong_password:
            raise ValueError("Invalid username or password")
        
        return UserResponse.model_validate(user)
    
    async def get_current_user(self, token: Annotated[str, Depends(oauth2_scheme)]) -> UserResponse:
        logger.info(f"Getting current user with token: {token}")
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: str = payload.get("sub")
            username: str = payload.get("username")
            logger.info(f"User ID: {user_id}, Username: {username}")
            
            if user_id is None:
                raise credentials_exception
            token_data = TokenData(user_id=user_id, username=username)
        except InvalidTokenError:
            raise credentials_exception
        with MysqlConnector() as mysql_conn:
            user = mysql_conn.get_user_by_username(username=token_data.username)
        if user is None:
            raise credentials_exception
        return UserResponse.model_validate(user)
    
    async def get_current_user_admin(self, token: Annotated[str, Depends(oauth2_scheme)]) -> UserResponse:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: str = payload.get("sub")
            username: str = payload.get("username")
            if user_id is None:
                raise credentials_exception
            token_data = TokenData(user_id=user_id, username=username)
        except InvalidTokenError:
            raise credentials_exception
        with MysqlConnector() as mysql_conn:
            user = mysql_conn.get_user_by_username(username=token_data.username)
        if user is None:
            raise credentials_exception
        if not user.admin:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an admin user")
        return UserResponse.model_validate(user)