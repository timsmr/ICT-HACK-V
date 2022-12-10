from pydantic import BaseModel


class AdminModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str