from pydantic import BaseModel


class StudentChangeInfoModel(BaseModel):
    first_name: str
    last_name: str
    bio: str | None
    education: str | None
    hard_soft_skills: str| None
    projects: str| None
    telegram: str | None
    phone_number: str
    linkedin: str| None
    site: str| None
    specialization: str| None
    email: str
    
    
class StudentModel(StudentChangeInfoModel):
    password: str
    
    
class ResponseUnsendModel(BaseModel):
    user_email: str
    project_name: str
    project_type: str
    
    
class ResponseModel(BaseModel):
    # ! модель для отклика на резюме/презентация
    user_email: str
    project_name: str
    message: str
    project_type: str
    
    