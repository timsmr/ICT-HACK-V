from app.dbManager.Entities import PetProjectEntity, StudentEntity
from app.routers.common_functions.exceptions import is_account_exist, is_project_exist, is_user_in_project
from app.routers.pet_project_router.pet_project_models import NewMemberModel, PetProjectModel, PetProjectNameModel
from app.routers.pet_project_router.pet_project_service import PetProjectService
from fastapi import APIRouter, Depends


pet_project_router = APIRouter(
    prefix="/pet_project",
    tags=["pet_project"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)

service = PetProjectService()


@pet_project_router.post("/create_project")
async def create_pet_project(body: PetProjectModel):
    return service.create_project(body)


@pet_project_router.post("/add_to_project")
async def add_to_project(body: NewMemberModel):
    project = is_project_exist(body.project_name, True, PetProjectEntity)
    user = is_account_exist(body.student_email, True, StudentEntity)
    return service.add_user_to_project(user.id, project.id, "pet")


@pet_project_router.get("/project_members")
async def get_project_members(body: PetProjectNameModel):
    return service.get_project_members(body)


@pet_project_router.get("/get_all")
async def get_all_projects():
    return service.get_projects()