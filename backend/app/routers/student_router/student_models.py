from pydantic import BaseModel


class StudentModel(BaseModel):
    first_name: str
    last_name: str
    bio: str
    education: str
    hard_soft_skills: str
    projects: str
    telegram: str
    email: str
    phone_number: str
    linkedin: str
    site: str
    password: str
    