from typing import List
from dal import MysqlConnector
from modals import Comment, CommentCreate, CommentUpdate

class CommentsBL:       
    def create_comment(self, creator_id: int, article_id: int, comment_create: CommentCreate) -> Comment:
        comment = comment_create.model_dump()
        
        comment = Comment(**comment, creator_id=creator_id, article_id=article_id)
        
        with MysqlConnector() as mysql_connector:
            mysql_connector.create_comment(comment)
            mysql_connector.commit()
            mysql_connector.refresh(comment)
                    
        return comment

    def get_comments(self, article_id: str, skip: int = 0, limit: int = 100) -> List[Comment]:
        with MysqlConnector() as mysql_connector:
            comments: List[Comment] = mysql_connector.get_comments(article_id, skip, limit)

        return comments
    
    def update_comment(self, current_user_id: int, article_id: int, comment_id: int, comment_update: CommentUpdate) -> Comment:
        with MysqlConnector() as mysql_connector:
            comment: Comment = mysql_connector.update_comment(current_user_id, comment_id, comment_update)
            mysql_connector.commit()
            mysql_connector.refresh(comment)
        
        return comment
    
    def delete_comment(self, article_id: int, comment_id: int) -> Comment:
        with MysqlConnector() as mysql_connector:
            comment: Comment = mysql_connector.delete_comment(comment_id)
            mysql_connector.commit()
        
        return comment

        
