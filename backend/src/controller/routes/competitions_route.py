from fastapi import APIRouter
from bl import CompetitionsBL
import logging

logger = logging.getLogger("uvicorn")
competitions_route = APIRouter()

@competitions_route.get("")
async def get_competitions():
    return await CompetitionsBL().get_competitions()

@competitions_route.get("/{id}/{action}")
async def get_competition_action(id: str, action: str):
    return await CompetitionsBL().get_competition_action(id, action)