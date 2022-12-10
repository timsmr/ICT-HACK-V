from fastapi import APIRouter, Depends
from app.dbManager.Entities import OrganizationEntity, OrganizationTokenEntity
from app.routers.common_functions.common_models import AccountVerificationModel
from app.routers.organization_router.organization_models import OrganizationModel

from app.routers.organization_router.organization_service import OrganizationService


organization_router = APIRouter(
    prefix="/organization",
    tags=["organization"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)


service = OrganizationService()


@organization_router.get("/")
async def hello_function():
    return {"success": "organization router"}


@organization_router.post("/create_organization")
async def create_organization(body: OrganizationModel):
    return service.create_organization(body)


@organization_router.get("/sign_in")
async def sign_in(body: AccountVerificationModel):
    return service.verify_user(body, OrganizationEntity, OrganizationTokenEntity)