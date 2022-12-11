from fastapi import APIRouter, Depends
from app.routers.position_router.position_models import PositionIdModel, PositionModel, PositionStatusModel

from app.routers.position_router.position_service import PositionService



position_router = APIRouter(
    prefix="/position",
    tags=["position"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)

service = PositionService()


@position_router.post("/create_position")
async def create_position(body: PositionModel):
    return service.create_position(body)


@position_router.patch("/position_status")
async def change_status(body: PositionStatusModel):
    return service.change_status(body)


@position_router.delete("/delete_position")
async def delete_position(body: PositionIdModel):
    return service.delete_position(body)


@position_router.get("/get_all")
async def get_all_positions():
    return service.get_all()