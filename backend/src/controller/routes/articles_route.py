from typing import Annotated, List
from fastapi import APIRouter, Depends
from modals import Article
from bl import ArticlesBL, UsersBL
from modals import UserResponse, ArticleCreate, ArticleUpdate
import logging

logger = logging.getLogger("uvicorn")

articles_route = APIRouter()

# Create
@articles_route.post("/", response_model=int)
async def create_article(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user)], article: ArticleCreate):
    logger.info(f"Creating article: {article.title}")
    return ArticlesBL().create_article(current_user.id ,article).id

# Read all
@articles_route.get("/", response_model=List[Article])
def get_articles(skip: int = 0, limit: int = 100):
    return ArticlesBL().get_articles(skip=skip, limit=limit)

# Read one
@articles_route.get("/{article_id}", response_model=Article)
def get_article(article_id: int):
    return ArticlesBL().get_article(id=article_id)

# Update
@articles_route.put("/{article_id}", response_model=int)
def update_article(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user)], article_id: int, article: ArticleUpdate) -> Article:
    return ArticlesBL().update_article(current_user.id, article_id, article).id

# Delete
@articles_route.delete("/{article_id}", response_model=int)
def delete_article(current_user: Annotated[UserResponse, Depends(UsersBL().get_current_user_admin)], article_id: int):
    return ArticlesBL().delete_article(article_id).id