import uvicorn
from fastapi import FastAPI, Depends
from fastapi.responses import HTMLResponse
import sys
sys.path.append("..") # Adds higher directory to python modules path.
from app.routers.student_router.student_router import student_router
from fastapi.security import OAuth2PasswordBearer
from app.dbManager.dbManager import engine
from sqlalchemy_utils import database_exists
from alembic.config import Config

app = FastAPI()
app.include_router(student_router)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/")
async def get():
    return {"start_message": 'hello world',
            str(engine.url): str(database_exists(engine.url))}




