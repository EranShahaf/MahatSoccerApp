from .utils import redis_bloom_cache
from dal import FootballApi
import os

class CompetitionsBL:
    @redis_bloom_cache(os.getenv('BLOOM_KEY'), 'competitions')
    async def get_competitions(self):
        return await FootballApi().get_competitions()
        
    @redis_bloom_cache(os.getenv('BLOOM_KEY'), 'competition_actions')
    def get_competition_action(self, id: str, action: str):
        return FootballApi().get_competition_action(id, action)