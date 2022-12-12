from pydantic import BaseModel
    
    
class OrganizationChangeInfoModel(BaseModel):
    email: str
    name: str
    description: str | None
    contacts: str | None
    specialization: str | None
    
    
class OrganizationModel(OrganizationChangeInfoModel):
    email: str
    password: str