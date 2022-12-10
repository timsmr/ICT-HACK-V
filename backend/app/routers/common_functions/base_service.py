from sqlalchemy import update
from app.routers.common_functions.common_models import AccountVerificationModel, TokenResponseModel
from app.routers.common_functions.exceptions import is_account_exist
from app.routers.common_functions.helper_functions import create_access_token, get_expires_delta, verify_password
from app.dbManager.dbManager import session

class BaseService():
    #авторизация для любой из 3х сущностей
    def verify_user(self, body: AccountVerificationModel, user_entity, token_entity):
        user = is_account_exist(body.email, True, user_entity)
        verify_password(body.password, user.password)
        
        new_token = create_access_token(user.email)
        expires_delta = get_expires_delta()
        
        session.execute(update(token_entity).
                        where(token_entity.user_id == user.id).
                        values(token=new_token,
                               expire_date=expires_delta)
                        )
        session.commit()
        
        return TokenResponseModel(
            user_id=user.id,
            token=new_token
        )