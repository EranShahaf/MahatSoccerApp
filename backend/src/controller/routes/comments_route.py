from typing import Annotated, List
from fastapi import APIRouter, Depends
from modals import Comment
from bl import CommentsBL, UsersBL
from modals import UserResponse, CommentCreate, CommentUpdate
import logging

logger = logging.getLogger("uvicorn")

comments_route = APIRouter()

# Create
@comments_route.post("", response_model=int)
async def create_comment(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user)], article_id: str, comment: CommentCreate):
    return CommentsBL().create_comment(current_user.id , article_id, comment).id

# Read all
@comments_route.get("", response_model=List[Comment])
def get_comments(article_id: int, skip: int = 0, limit: int = 100):
    return CommentsBL().get_comments(article_id=article_id, skip=skip, limit=limit)

# Update
@comments_route.put("/{comment_id}", response_model=int)
def update_comment(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user)], article_id: int, comment_id: int, comment: CommentUpdate) -> Comment:
    return CommentsBL().update_comment(current_user.id, article_id, comment_id, comment).id

# Delete
@comments_route.delete("/{comment_id}", response_model=int)
def delete_comment(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user_admin)], article_id: int, comment_id: int):
    return CommentsBL().delete_comment(article_id, comment_id).id