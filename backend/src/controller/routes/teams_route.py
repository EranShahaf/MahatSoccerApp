from fastapi import APIRouter
from bl import TeamsBL
import logging

logger = logging.getLogger("uvicorn")
teams_route = APIRouter()

@teams_route.get("/{id}")
async def get_team(id: str):
    return await TeamsBL().get_team(id)

@teams_route.get("/{id}/matches")
async def get_team_matches(id: str):
    return await TeamsBL().get_team_matches(id)
