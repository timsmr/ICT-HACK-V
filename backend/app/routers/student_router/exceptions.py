from fastapi import HTTPException
from app.dbManager.dbManager import session
from starlette import status
from app.dbManager.Entities import StudentEntity
from app.routers.student_router.helper_functions import password_context

def is_user_excist(user_email, required_statement: bool):
    """
    проверяет существование студента с таким email в бд
    required_statement - должен ли существовать
    """
    user = session.query(StudentEntity).filter_by(email=user_email).order_by(StudentEntity.id).first()
    if required_statement and not user:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user does not exist"
            )
    elif not required_statement and user:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user already exists"
            )
    elif required_statement and user:
        # для уменьшения количества запросов к бд в случае, если юзер существует
        # и должен существовать, сразу его возвращаем
        return user
    else:
        pass
    

def verify_password(password: str, hashed_password: str) -> bool:
    if not password_context.verify(password, hashed_password):
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="wrong password"
            )
    return True