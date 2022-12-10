from fastapi import HTTPException
from app.dbManager.dbManager import session
from starlette import status
from app.dbManager.Entities import ProjectMemberEntity, StudentEntity
from app.routers.common_functions.helper_functions import password_context

def is_account_exist(email, required_statement: bool, entity):
    """
    проверяет существование аккаунта с таким email в бд
    required_statement - должен ли существовать
    """
    account = session.query(entity).filter_by(email=email).order_by(entity.id).first()
    if required_statement and not account:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="account does not exist"
            )
    elif not required_statement and account:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="account already exists"
            )
    elif required_statement and account:
        # для уменьшения количества запросов к бд в случае, если пользователь существует
        # и должен существовать, сразу его возвращаем
        return account
    else:
        pass
    
    
def is_project_exist(name, required_statement: bool, entity):
    project = session.query(entity).filter_by(name=name).order_by(entity.id).first()
    if required_statement and not project:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="project does not exist"
            )
    elif not required_statement and project:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="project already exists"
            )
    elif required_statement and project:
        # для уменьшения количества запросов к бд в случае, если проект существует
        # и должен существовать, сразу его возвращаем
        return project
    else:
        pass
    

def verify_password(password: str, hashed_password: str) -> bool:
    if not password_context.verify(password, hashed_password):
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="wrong password"
            )
    return True


def is_user_in_project(user_id: int, project_id: int,  required_statement: bool):
    # ! TO DO
    return True