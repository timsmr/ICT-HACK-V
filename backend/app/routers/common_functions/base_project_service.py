from app.dbManager.Entities import PetProjectEntity, StudentEntity, ProjectMemberEntity
from app.dbManager.dbManager import session

class BaseProjectService():
    def add_user_to_project(self, user_id: int, project_id: int, project_type: str):
        """
        project type 
        для пет проекта - pet
        для коммерческого проекта - commercial
        """
        if project_type == "pet":
            new_member = ProjectMemberEntity(
                user_id = user_id,
                pet_project_id = project_id
            )
            session.add_all([new_member])
            session.commit()
        return True
    