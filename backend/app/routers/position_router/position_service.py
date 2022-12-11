from sqlalchemy import update
from app.dbManager.Entities import OrganizationEntity, PositionEntity
from app.routers.common_functions.exceptions import is_account_exist, is_position_exist
from app.routers.position_router.position_models import PositionIdModel, PositionModel, PositionStatusModel
from app.dbManager.dbManager import session

class PositionService():
    def create_position(self, body: PositionModel):
        organization = is_account_exist(body.organization_email, True, OrganizationEntity)
        new_position = PositionEntity(
            description = body.description,
            requirements = body.requirements,
            organization_id = organization.id
        )
        session.add_all([new_position])
        session.commit()
        return True
    
    
    def change_status(self, body: PositionStatusModel):
        position = is_position_exist(body.id)
        session.execute(update(PositionEntity).
                        where(PositionEntity.id == body.id).
                        values(
                            is_active = body.is_active
                        )
                        )
        return position
    
    
    def delete_position(self, body: PositionIdModel):
        position = is_position_exist(body.id, True)
        session.delete(position)
        session.commit()
        return True
    
    
    def get_all(self):
        return session.query(PositionEntity).all()