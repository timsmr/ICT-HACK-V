from app.dbManager.Entities import PetProjectEntity, ProjectMemberEntity, StudentEntity
from app.routers.common_functions.exceptions import is_account_exist, is_project_exist
from app.routers.pet_project_router.pet_project_models import PetProjectModel, PetProjectNameModel
from app.routers.common_functions.base_project_service import BaseProjectService
from app.dbManager.dbManager import session


class PetProjectService(BaseProjectService):
    def create_project(self, body: PetProjectModel):
        is_project_exist(body.name, False, PetProjectEntity)
        project_owner = is_account_exist(body.student_email, True, StudentEntity)
        new_pet_project = PetProjectEntity(
            name = body.name,
            description = body.description,
            student_id = project_owner.id
        ) 
        session.add_all([new_pet_project])
        session.commit()
        
        # ? костыль - достаём юзера из бд для получения сгенерированного id, 
        # ? затем создаём токен
        # ? запись в таблицу с токенами создается один раз! позже она только обновляется
        
        project = session.query(PetProjectEntity).filter_by(name = body.name).order_by(PetProjectEntity.id).first()
        self.add_user_to_project(project.student_id, project.id, project_type="pet")
        return True
    
    
    def get_project_members(self, body: PetProjectNameModel):
        project = is_project_exist(body.name, True, PetProjectEntity)
        return session.query(ProjectMemberEntity).filter_by(pet_project_id = project.id).order_by(ProjectMemberEntity.id).all()
    
    
    def get_projects(self):
        return session.query(PetProjectEntity).all()
    
        