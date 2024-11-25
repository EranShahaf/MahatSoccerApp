from typing import List
from dal import MysqlConnector
from modals import Article, ArticleCreate, ArticleUpdate

class ArticlesBL:       
    def create_article(self, creator_id: int, article_create: ArticleCreate) -> Article:
        article = article_create.model_dump()
        
        article = Article(**article, creator_id=creator_id)
        
        with MysqlConnector() as mysql_connector:
            mysql_connector.create_article(article)
            mysql_connector.commit()
            mysql_connector.refresh(article)
                    
        return article

    def get_articles(self, skip: int = 0, limit: int = 100) -> List[Article]:
        with MysqlConnector() as mysql_connector:
            articles: List[Article] = mysql_connector.get_articles(skip, limit)

        return articles
    
    def get_article(self, id: int) -> Article:
        with MysqlConnector() as mysql_connector:
            article: Article = mysql_connector.get_article_by_id(id)
        
        return article
    
    def update_article(self, current_user_id: int, article_id: int, article_update: ArticleUpdate) -> Article:
        with MysqlConnector() as mysql_connector:
            article: Article = mysql_connector.update_article(current_user_id, article_id, article_update)
            mysql_connector.commit()
            mysql_connector.refresh(article)
        
        return article
    
    def delete_article(self, article_id: int) -> Article:
        with MysqlConnector() as mysql_connector:
            article: Article = mysql_connector.delete_article(article_id)
            mysql_connector.commit()
        
        return article

        
