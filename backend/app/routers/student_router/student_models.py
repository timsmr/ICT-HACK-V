from datetime import datetime
from typing import Optional

from pydantic import UUID4, BaseModel, validator, Field


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


class TokenResponseModel(BaseModel):
    user_id: int
    token: str
    

class StudentVerificationModel(BaseModel):
    email: str
    password: str