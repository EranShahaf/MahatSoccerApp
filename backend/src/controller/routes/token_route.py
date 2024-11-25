from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from security import (
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from bl import UsersBL, TokenBL
from modals import Token
from datetime import timedelta
import logging

logger = logging.getLogger("uvicorn")

token_route = APIRouter()

@token_route.post("")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = UsersBL().authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = TokenBL().create_access_token(
        data={"sub": user.id, "username": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")