from passlib.context import CryptContext
from typing import Union, Any
from jose import jwt
from datetime import datetime, timedelta


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_DAYS = 30
ALGORITHM = "HS256"
JWT_SECRET_KEY = "secret"

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)


def create_access_token(subject: Union[str, Any], expires_delta: int = None):
        expires_delta = datetime.utcnow() + timedelta(days=30)

        to_encode = {"exp": expires_delta, "sub": str(subject)}
        encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
        return encoded_jwt
    
def get_expires_delta():
    expires_delta = datetime.now() + timedelta(days=30)
    return expires_delta
                