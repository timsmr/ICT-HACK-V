from pydantic import BaseModel

class PositionIdModel(BaseModel):
    id: int

class PositionStatusModel(PositionIdModel):
    is_active: bool
    
class PositionModel(BaseModel):
    name: str
    description: str
    requirements: str
    organization_email: str
    