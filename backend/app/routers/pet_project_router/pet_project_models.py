from pydantic import BaseModel


class PetProjectNameModel(BaseModel):
    name: str
    
    
class PetProjectModel(PetProjectNameModel):
    student_email: str
    description: str
    
    
class NewMemberModel(BaseModel):
    student_email: str
    project_name: str