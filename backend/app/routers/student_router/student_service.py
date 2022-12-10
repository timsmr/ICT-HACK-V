from sqlalchemy import update
from app.dbManager.dbManager import session
from app.routers.student_router.student_models import StudentModel
from app.routers.common_funcions.common_models import AccountVerificationModel, TokenResponseModel
from app.dbManager.Entities import StudentEntity, StudentTokenEntity
from app.routers.common_funcions.helper_functions import get_hashed_password, create_access_token, get_expires_delta
from app.routers.common_funcions.exceptions import is_account_excist, verify_password
class StudentService():
    def create_user(self, body: StudentModel):
        is_account_excist(body.email, False, StudentEntity)
        created_user = StudentEntity(
            first_name=body.first_name,
            last_name = body.last_name,
            bio = body.bio,
            education = body.education,
            hard_soft_skills = body.hard_soft_skills,
            projects = body.projects,
            telegram = body.telegram,
            email = body.email,
            phone_number = body.phone_number,
            linkedin = body.linkedin,
            site = body.site,
            password = get_hashed_password(body.password)
        )
        
        session.add_all([created_user])
        session.commit()
        
        # ? костыль - достаём юзера из бд для получения сгенерированного id, 
        # ? затем создаём токен
        # ? запись в таблицу с токенами создается один раз! позже она только обновляется
        
        user = session.query(StudentEntity).filter_by(email=body.email).order_by(StudentEntity.id).first()
        new_token = StudentTokenEntity(
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
        
        
    def verify_user(self, body: AccountVerificationModel):
        user = is_account_excist(body.email, True, StudentEntity)
        verify_password(body.password, user.password)
        new_token = create_access_token(user.email)
        expires_delta = get_expires_delta()
        print(expires_delta)
        session.execute(update(StudentTokenEntity).
                        where(StudentTokenEntity.user_id == user.id).
                        values(token=new_token,
                               expire_date=expires_delta)
                        )
        session.commit()
        return TokenResponseModel(
            user_id=user.id,
            token=new_token
        )
        