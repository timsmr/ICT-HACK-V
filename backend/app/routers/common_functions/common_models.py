
from pydantic import BaseModel


class TokenResponseModel(BaseModel):
    user_id: int
    token: str
    

class AccountVerificationModel(BaseModel):
    email: str
    password: str
    

class TokenModel(BaseModel):
    token: str