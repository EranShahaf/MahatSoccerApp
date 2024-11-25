from .utils import redis_bloom_cache
from dal import FootballApi
import os

class TeamsBL:
    @redis_bloom_cache(os.getenv('BLOOM_KEY'), 'teams')    
    async def get_team(self, id: str):
        return await FootballApi().get_team(id)
    
    @redis_bloom_cache(os.getenv('BLOOM_KEY'), 'team_matches')
    async def get_team_matches(self, id: str):
        return await FootballApi().get_team_matches(id)