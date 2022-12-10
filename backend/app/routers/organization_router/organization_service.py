from sqlalchemy import update
from app.dbManager.Entities import OrganizationEntity, OrganizationTokenEntity
from app.dbManager.dbManager import session
from app.routers.common_functions.base_user_service import BaseUserService
from app.routers.common_functions.helper_functions import get_hashed_password, create_access_token, get_expires_delta
from app.routers.common_functions.exceptions import is_account_exist, verify_password
from app.routers.organization_router.organization_models import OrganizationModel
from app.routers.common_functions.common_models import AccountVerificationModel, TokenResponseModel


class OrganizationService(BaseUserService):
    def create_organization(self, body: OrganizationModel):
        is_account_exist(body.email, False, OrganizationEntity)
        created_organization = OrganizationEntity(
            name = body.name,
            description = body.description,
            email = body.email,
            contacts = body.contacts,
            approved = False, 
            specialization = body.specialization,
            password = get_hashed_password(body.password)
        )
        session.add_all([created_organization])
        session.commit()
        
        # ? костыль - достаём юзера из бд для получения сгенерированного id, 
        # ? затем создаём токен
        # ? запись в таблицу с токенами создается один раз! позже она только обновляется
        
        
        organization = session.query(OrganizationEntity).filter_by(email=body.email).order_by(OrganizationEntity.id).first()
        new_token = OrganizationTokenEntity(
            token = create_access_token(body.email),
            expire_date = get_expires_delta(),
            user_id = organization.id
        )
        
        session.add_all([new_token])
        session.commit()
        
        return TokenResponseModel(
            user_id=new_token.user_id,
            token=new_token.token
        )
        
    def change_organization_inf(self, body: OrganizationModel):
        is_account_exist(body.email, True, OrganizationEntity)
        session.execute(update(OrganizationEntity).
                        where(OrganizationEntity.email == body.email).
                        values(
                            name = body.name,
                            description = body.description,
                            contacts = body.contacts,
                            specialization = body.specialization,
                        )
                        )
        session.commit()
        return session.query(OrganizationEntity).filter_by(email=body.email).order_by(OrganizationEntity.id).first()