from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column, Integer, LargeBinary

# Comment model
class Comment(SQLModel, table=True):
    id: int | None = Field(
        sa_column=Column(
            Integer, 
            primary_key=True,
            autoincrement=True
        )
    )
    creator_id: int = Field(foreign_key="user.id")
    article_id: int = Field(foreign_key="article.id")
    title: str
    content: bytes = Field(sa_column=LargeBinary)
    
    creator: "User" = Relationship(back_populates="comments")
    article: "Article" = Relationship(back_populates="comments")

# Comment creation model
class CommentCreate(SQLModel):
    title: str
    content: bytes
    
# Comment update model
class CommentUpdate(SQLModel):
    title: str | None
    content: bytes | None