from typing import Annotated, List
from fastapi import APIRouter, Depends
from modals import Tag
from bl import TagsBL, UsersBL
from modals import UserResponse, TagCreate
import logging

logger = logging.getLogger("uvicorn")

tags_route = APIRouter()

# Create
@tags_route.post("", response_model=int)
async def create_tag_to_article(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user)], article_id: str, tag: TagCreate):
    return TagsBL().create_tag_to_article(article_id, tag).id

# Read all
@tags_route.get("", response_model=List[Tag])
def get_tags_of_article(article_id: int, skip: int = 0, limit: int = 100):
    return TagsBL().get_tags_of_article(article_id=article_id, skip=skip, limit=limit)

# Delete
@tags_route.delete("/{tag_id}", response_model=int)
def delete_tag_from_article(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user_admin)], article_id: int, tag_id: int):
    return TagsBL().delete_tag_from_article(article_id, tag_id).id