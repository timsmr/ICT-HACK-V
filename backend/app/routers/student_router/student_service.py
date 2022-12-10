from sqlalchemy import update
from app.dbManager.dbManager import session
from app.routers.common_functions.base_user_service import BaseUserService
from app.routers.student_router.student_models import ResponseModel, StudentChangeInfoModel, StudentModel
from app.routers.common_functions.common_models import AccountVerificationModel, TokenResponseModel
from app.dbManager.Entities import StudentEntity, StudentTokenEntity
from app.routers.common_functions.helper_functions import get_hashed_password, create_access_token, get_expires_delta
from app.routers.common_functions.exceptions import is_account_exist, verify_password
class StudentService(BaseUserService):
    def create_user(self, body: StudentModel):
        is_account_exist(body.email, False, StudentEntity)
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
        
    def change_student_inf(self, body: StudentChangeInfoModel):
        is_account_exist(body.email, True, StudentEntity)
        session.execute(update(StudentEntity).
                        where(StudentEntity.email == body.email).
                        values(
                            first_name=body.first_name,
                            last_name = body.last_name,
                            bio = body.bio,
                            education = body.education,
                            hard_soft_skills = body.hard_soft_skills,
                            projects = body.projects,
                            telegram = body.telegram,
                            phone_number = body.phone_number,
                            linkedin = body.linkedin,
                            site = body.site,
                            )
                        )
        session.commit()
        return session.query(StudentEntity).filter_by(email=body.email).order_by(StudentEntity.id).first()
    
    
    
    def send_response(self, body: ResponseModel):
        return True