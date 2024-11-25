from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from .routes import (
    competitions_route, 
    teams_route, 
    users_route, 
    token_route, 
    articles_route, 
    comments_route,
    tags_route
)
import logging

logger = logging.getLogger("uvicorn")

description = """
Football-App API helps you do awesome stuff. 🚀

## Get teams and competiotions data
## Create your own articles
"""

app = FastAPI(
    title="Football-App API",
    description=description,
    summary="Deadpool's favorite app. Nuff said.",
    version="0.0.1",
    contact={
        "name": "Deadpoolio the Amazing",
        # "url": "http://x-force.example.com/contact/",
        # "email": "dp@x-force.example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            logger.info(f"Received request: {request.method} {request.url}")
            response = await call_next(request)
            return response
        except Exception as e:
            logger.exception(f"Unhandled exception: {e}")
            return JSONResponse(
                status_code=500,
                content={"error": e.__class__.__name__, "message": str(e)}
            )

app.add_middleware(ExceptionHandlerMiddleware)

app.include_router(competitions_route, prefix="/competitions", tags=["competitions"])
app.include_router(teams_route, prefix="/teams", tags=["teams"])
app.include_router(users_route, prefix="/users", tags=["users"])
app.include_router(token_route, prefix="/token", tags=["token"])
app.include_router(articles_route, prefix="/articles", tags=["articles"])
app.include_router(comments_route, prefix="/articles/{article_id}/comments", tags=["comments"])
app.include_router(tags_route, prefix="/articles/{article_id}/tags", tags=["tags"])