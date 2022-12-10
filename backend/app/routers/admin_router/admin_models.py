from pydantic import BaseModel


class AdminChangeInfoModel(BaseModel):
    email: str
    first_name: str
    last_name: str
    


class AdminModel(AdminChangeInfoModel):
    password: str