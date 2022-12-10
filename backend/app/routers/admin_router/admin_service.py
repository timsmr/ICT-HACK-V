from sqlalchemy import update
from app.dbManager.Entities import AdminEntity, AdminTokenEntity
from app.routers.admin_router.admin_models import AdminChangeInfoModel, AdminModel
from app.routers.common_functions.base_service import BaseService
from app.routers.common_functions.common_models import TokenResponseModel
from app.routers.common_functions.exceptions import is_account_exist
from app.routers.common_functions.helper_functions import create_access_token, get_expires_delta, get_hashed_password
from app.dbManager.dbManager import session


class AdminService(BaseService):
    def create_user(self, body: AdminModel):
        is_account_exist(body.email, False, AdminEntity)
        created_user = AdminEntity(
            first_name = body.first_name,
            last_name = body.last_name,
            email = body.email,
            password = get_hashed_password(body.password)
        )
        
        session.add_all([created_user])
        session.commit()
        
        # ? костыль - достаём юзера из бд для получения сгенерированного id, 
        # ? затем создаём токен
        # ? запись в таблицу с токенами создается один раз! позже она только обновляется
        
        user = session.query(AdminEntity).filter_by(email=body.email).order_by(AdminEntity.id).first()
        new_token = AdminTokenEntity(
            token = create_access_token(body.email),
            expire_date = get_expires_delta(),
            user_id = user.id
        )
        
        session.add_all([new_token])
        session.commit()
        
        return TokenResponseModel(
            user_id=new_token.user_id,
            token=new_token.token
        )
        
    
    def change_admin_inf(self, body: AdminChangeInfoModel):
        is_account_exist(body.email, True, AdminEntity)
        session.execute(update(AdminEntity).
                        where(AdminEntity.email == body.email).
                        values(
                            first_name = body.first_name,
                            last_name = body.last_name
                        )
                        )
        session.commit()
        return session.query(AdminEntity).filter_by(email=body.email).order_by(AdminEntity.id).first()