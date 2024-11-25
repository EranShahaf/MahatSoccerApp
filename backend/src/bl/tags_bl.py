from typing import List
from dal import MysqlConnector
from modals import Tag, TagCreate

class TagsBL:       
    def create_tag_to_article(self, article_id: int, tag: TagCreate) -> Tag:
        tag = tag.model_dump()
        
        tag = Tag(**tag, article_id=article_id)
        
        with MysqlConnector() as mysql_connector:
            mysql_connector.create_tag(tag)
            mysql_connector.commit()
            mysql_connector.refresh(tag)
        
        return tag
        
    def get_tags_of_article(self, article_id: str, skip: int = 0, limit: int = 100) -> List[Tag]:
        with MysqlConnector() as mysql_connector:
            tags: List[Tag] = mysql_connector.get_tags_of_article(article_id, skip, limit)

        return tags
    
    def delete_tag_from_article(self, article_id: int, tag_id: int) -> Tag:
        with MysqlConnector() as mysql_connector:
            tag: Tag = mysql_connector.delete_tag_from_article(article_id, tag_id)
            mysql_connector.commit()
        
        return tag

        
