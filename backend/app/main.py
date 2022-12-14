import uvicorn
from fastapi import FastAPI, Depends
from fastapi.responses import HTMLResponse
import sys
from fastapi.middleware.cors import CORSMiddleware
sys.path.append("..") # Adds higher directory to python modules path.
from app.routers.student_router.student_router import student_router
from app.routers.organization_router.organization_router import organization_router
from app.routers.admin_router.admin_router import admin_router
from app.routers.pet_project_router.pet_project_router import pet_project_router
from app.routers.position_router.position_router import position_router
from fastapi.security import OAuth2PasswordBearer
from app.dbManager.dbManager import engine
from sqlalchemy_utils import database_exists
from alembic.config import Config
from app.dbManager.dbManager import session

app = FastAPI()
app.include_router(student_router)
app.include_router(organization_router)
app.include_router(admin_router)
app.include_router(pet_project_router)
app.include_router(position_router)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown():
    # когда приложение останавливается разрываем соединение с БД
    session.close()

@app.get("/")
async def get():
    return {"start_message": 'hello world',
            str(engine.url): str(database_exists(engine.url))}




