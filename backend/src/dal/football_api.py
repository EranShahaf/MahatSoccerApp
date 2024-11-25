import httpx
import os
import logging

logger = logging.getLogger("uvicorn")

class FootballApi:
    def __init__(self):
        self._base_url = "https://api.football-data.org/v4"
        self._headers = {
            "X-Auth-Token": os.environ["FOOTBALL_API_TOKEN"],
            "Accept-Encoding": "",
        }
        
        self._global_params = {"limit": "10000"}
    
    async def _get(self, url: str) -> dict: 
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self._base_url}/{url}",
                headers=self._headers,
                params=self._global_params
            )
            response.raise_for_status()  # Raise an exception for HTTP errors
            data = response.json()
        
        return data
    
    async def get_team(self, id: str) -> dict:
        return await self._get(f"teams/{id}")
            
    async def get_team_matches(self, id: str) -> dict:
        return await self._get(f"teams/{id}/matches")
        
    async def get_competitions(self) -> dict:
        return await self._get("competitions")

    async def get_competition_action(self, id: str, action: str) -> dict:
        return await self._get(f"competitions/{id}/{action}")