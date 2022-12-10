from pydantic import BaseModel


class StudentChangeInfoModel(BaseModel):
    first_name: str
    last_name: str
    bio: str
    education: str
    hard_soft_skills: str
    projects: str
    telegram: str
    phone_number: str
    linkedin: str
    site: str
    email: str
    
    
class StudentModel(StudentChangeInfoModel):
    password: str
    