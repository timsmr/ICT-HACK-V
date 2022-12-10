from fastapi import APIRouter, Depends
from app.dbManager.Entities import StudentEntity, StudentTokenEntity
from app.routers.student_router.student_service import StudentService
from app.routers.student_router.student_models import StudentModel
from app.routers.common_functions.common_models import AccountVerificationModel, TokenModel


student_router = APIRouter(
    prefix="/student",
    tags=["student"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)

service = StudentService()


@student_router.get("/")
async def hello_function(body: TokenModel):
    return service.get_current_user(body, StudentEntity, StudentTokenEntity)


@student_router.post("/create_user")
async def create_user(body: StudentModel):
    return service.create_user(body)

@student_router.get("/sign_in")
async def sign_in(body: AccountVerificationModel):
    return service.verify_user(body, StudentEntity, StudentTokenEntity)