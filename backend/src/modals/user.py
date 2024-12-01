from typing import List, Optional
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column, Integer, String

# User model
class User(SQLModel, table=True):
    id: Optional[int] = Field(
        sa_column=Column(
            Integer, 
            primary_key=True,
            autoincrement=True
        )
    )
    username: str = Field(
        sa_column=Column(
            String(100),
            unique=True,
            index=True
        )
    )
    full_name: str
    hashed_password: str
    admin: bool = False
    favorite_team_id: int | None = None
    
    articles: List["Article"] = Relationship(back_populates="creator", cascade_delete=True)
    comments: List["Comment"] = Relationship(back_populates="creator", cascade_delete=True)

# User creation model
class UserCreate(SQLModel):
    username: str
    full_name: str
    password: str
    admin: bool = False
    favorite_team_id: int | None = None

# User update model
class UserUpdate(SQLModel):
    username: Optional[str] = None
    full_name: Optional[str] = None
    admin: bool = False
    favorite_team_id: int | None = None

# User response model
class UserResponse(SQLModel):
    id: Optional[int] = None
    username: str
    full_name: str
    admin: bool = False
    favorite_team_id: int | None = None