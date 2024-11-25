from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column, Integer, Enum as SQLAlchemyEnum
from enum import Enum

class TagTypes(Enum):
    TEAM = "team"
    COMPETITION = "competition"

# Tag model
class Tag(SQLModel, table=True):
    id: int | None = Field(
        sa_column=Column(
            Integer, 
            primary_key=True,
            autoincrement=True
        )
    )
    article_id: int = Field(foreign_key="article.id")
    name: str
    type: TagTypes = Field(sa_column=Column(SQLAlchemyEnum(TagTypes)))
    object_id: int
    
    article: "Article" = Relationship(back_populates="tags")

# Tag creation model
class TagCreate(SQLModel):
    name: str
    object_id: int
    type: TagTypes = Field(sa_column=Column(SQLAlchemyEnum(TagTypes)))
    
