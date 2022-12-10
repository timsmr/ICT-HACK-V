from sqlalchemy import update
from app.dbManager.Entities import OrganizationEntity, OrganizationTokenEntity
from app.dbManager.dbManager import session
from app.routers.common_funcions.helper_functions import get_hashed_password, create_access_token, get_expires_delta
from app.routers.common_funcions.exceptions import is_account_excist, verify_password
from app.routers.organization_router.organization_models import OrganizationModel
from app.routers.common_funcions.common_models import AccountVerificationModel, TokenResponseModel


class OrganizationService():
    def create_organization(self, body: OrganizationModel):
        is_account_excist(body.email, False, OrganizationEntity)
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
        
    def verify_user(self, body: AccountVerificationModel):
        user = is_account_excist(body.email, True, OrganizationEntity)
        verify_password(body.password, user.password)
        new_token = create_access_token(user.email)
        expires_delta = get_expires_delta()
        print(expires_delta)
        session.execute(update(OrganizationTokenEntity).
                        where(OrganizationTokenEntity.user_id == user.id).
                        values(token=new_token,
                               expire_date=expires_delta)
                        )
        session.commit()
        return TokenResponseModel(
            user_id=user.id,
            token=new_token
        )
        