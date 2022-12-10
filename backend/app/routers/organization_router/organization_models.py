from pydantic import BaseModel
    
    
class OrganizationChangeInfoModel(BaseModel):
    email: str
    name: str
    description: str
    contacts: str
    specialization: str
    
    
class OrganizationModel(OrganizationChangeInfoModel):
    email: str
    password: str