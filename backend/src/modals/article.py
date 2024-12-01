from typing import List
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column, Integer, String

# Article model
class Article(SQLModel, table=True):
    id: int | None = Field(
        sa_column=Column(
            Integer, 
            primary_key=True,
            autoincrement=True
        )
    )
    creator_id: int = Field(foreign_key="user.id")
    title: str
    content: bytes = Field(sa_column=LargeBinary)
    
    tags: List["Tag"] = Relationship(back_populates="article", cascade_delete=True)
    comments: List["Comment"] = Relationship(back_populates="article", cascade_delete=True)
    creator: "User" = Relationship(back_populates="articles")

# Article creation model
class ArticleCreate(SQLModel):
    title: str
    content: bytes
    
# Article update model
class ArticleUpdate(SQLModel):
    title: str | None
    content: bytes | None