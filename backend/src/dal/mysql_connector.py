from sqlmodel import SQLModel, create_engine, Session
from modals import (
    Article, 
    ArticleUpdate, 
    User, 
    UserUpdate, 
    Comment, 
    CommentUpdate,
    Tag
)
from typing import Any, List, Tuple
from sqlalchemy import select, and_
import os

# Database configuration
DB_HOST = os.getenv("MYSQL_HOST", "localhost")
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
DB_NAME = os.getenv("MYSQL_DATABASE", "mydatabase")

# MySQL connection URL
DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# Create SQLModel engine
engine = create_engine(DATABASE_URL, echo=True)

def init_mysql_db():
    SQLModel.metadata.create_all(engine)

def _get_mysql_session() -> Session:
    return Session(engine)

class MysqlConnector:
    
    def __enter__(self):
        # Set up the resource
        self._mysql_session = _get_mysql_session()
        
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        # Clean up the resource
        if self._mysql_session:
            self._mysql_session.close()
            self._mysql_session = None
        
        # Handle exceptions if needed
        if exc_type is not None:
            print(f"An exception occurred: {exc_type}, {exc_value}")
        
        # Return False to propagate exceptions, True to suppress them
        return False
        
    def commit(self) -> None:
        self._mysql_session.commit()
        
    def refresh(self, obj: SQLModel) -> None:
        return self._mysql_session.refresh(obj)
    
    def create_user(self, user: User) -> None:
        return self._mysql_session.add(user)
    
    def get_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        users: List[Tuple[User, Any]] = self._mysql_session.exec(select(User).offset(skip).limit(limit)).all()
        return [user[0] for user in users]
    
    def get_user_by_id(self, user_id: int) -> User:
        user = self._mysql_session.exec(select(User).filter(User.id == id)).first()[0]
        
        if not user:
            raise ValueError(f"User with id {id} not found")
        
        return user
    
    def update_user(self, user_id: int, user_update: UserUpdate) -> User:
        statement = select(User).where(User.id == user_id)
        user = self._mysql_session.exec(statement).first()[0]
        
        if not user:
            raise ValueError(f"User with id {user_id} not found")
        
        update_data = user_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(user, key, value)
        
        return user
    
    def get_user_by_username(self, username: str) -> User:
        statement = select(User).where(User.username == username)
        user = self._mysql_session.exec(statement).first()[0]
        
        if not user:
            raise ValueError(f"User with username {username} not found")
                
        return user
    
    def delete_user_by_id(self, user_id: int) -> User:
        statement = select(User).where(User.id == user_id)
        user = self._mysql_session.exec(statement).first()[0]
                
        if not user:
            raise ValueError(f"User with id {user_id} not found")
        
        self._mysql_session.delete(user)
        
        return user
    
    def create_article(self, article: Article) -> None:
        return self._mysql_session.add(article)
    
    def get_articles(self, skip: int = 0, limit: int = 100) -> list[Article]:
        articles: List[Tuple[Article, Any]] = self._mysql_session.exec(select(Article).offset(skip).limit(limit)).all()
        return [article[0] for article in articles]
    
    def get_article_by_id(self, article_id: int) -> Article:
        article = self._mysql_session.exec(select(Article).filter(Article.id == article_id)).first()[0]
        
        if not article:
            raise ValueError(f"Article with id {article_id} not found")
        
        return article
    
    def update_article(self, current_user_id: int, article_id: int, article_update: ArticleUpdate) -> Article:
        statement = select(Article).where(and_(
            Article.id == article_id,
            Article.creator_id == current_user_id
        ))
        
        article = self._mysql_session.exec(statement).first()[0]
        
        if not article:
            raise ValueError(f"Article with id {article_id} of user {current_user_id} not found")
        
        update_data = article_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(article, key, value)
        
        return article
    
    def delete_article(self, article_id: int) -> Article:
        statement = select(Article).where(Article.id == article_id)
        article = self._mysql_session.exec(statement).first()[0]
        
        if not article:
            raise ValueError(f"Article with id {article_id} not found")
        
        self._mysql_session.delete(article)
        
        return article
    
    def create_comment(self, comment: Comment) -> None:
        return self._mysql_session.add(comment)
    
    def get_comments(self, article_id: str, skip: int = 0, limit: int = 100) -> List[Comment]:
        comments: List[Tuple[Comment, Any]] = self._mysql_session.exec(select(Comment).filter(Comment.article_id == article_id).offset(skip).limit(limit)).all()
        return [comment[0] for comment in comments]
    
    def update_comment(self, current_user_id: int, comment_id: int, comment_update: CommentUpdate) -> Comment:
        statement = select(Comment).where(and_(
            Comment.id == comment_id,
            Comment.creator_id == current_user_id
        ))
        
        comment = self._mysql_session.exec(statement).first()[0]
        
        if not comment:
            raise ValueError(f"Comment with id {comment_id} of user {current_user_id} not found")
        
        update_data = comment_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(comment, key, value)
        
        return comment
    
    def delete_comment(self, comment_id: int) -> Comment:
        statement = select(Comment).where(Comment.id == comment_id)
        comment = self._mysql_session.exec(statement).first()[0]
        
        if not comment:
            raise ValueError(f"Comment with id {comment_id} not found")
        
        self._mysql_session.delete(comment)
        
        return comment
    
    def create_tag(self, tag: Tag) -> None:
        return self._mysql_session.add(tag)
    
    def get_tags_of_article(self, article_id: str, skip: int = 0, limit: int = 100) -> List[Tag]:
        tags: List[Tuple[Tag, Any]] = self._mysql_session.exec(select(Tag).filter(Tag.article_id == article_id).offset(skip).limit(limit)).all()
        return [tag[0] for tag in tags]
    
    def delete_tag_from_article(self, article_id: str, tag_id: int) -> None:
        statement = select(Tag).where(and_(
            Tag.id == tag_id,
            Tag.article_id == article_id
            )
        )
        
        tag = self._mysql_session.exec(statement).first()[0]
        
        if not tag:
            raise ValueError(f"Tag with id {tag_id} on {article_id} not found")
        
        self._mysql_session.delete(tag)
        
        return tag