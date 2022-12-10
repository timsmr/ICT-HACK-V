from pydantic import BaseModel


class OrganizationModel(BaseModel):
    name: str
    description: str
    email: str
    contacts: str
    specialization: str
    password: str