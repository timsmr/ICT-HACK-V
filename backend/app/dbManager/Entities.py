from sqlalchemy import Column, Boolean, Integer, String, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Sequence
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship


Base = declarative_base()


class StudentEntity(Base):
    __tablename__ = "student_credits"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    first_name = Column(String(30))
    last_name = Column(String(30))
    bio = Column(String)
    education = Column(String)
    hard_soft_skills = Column(String)
    projects = Column(String)
    telegram = Column(String, unique=True, nullable=True)
    email = Column(String, unique=True)
    phone_number = Column(String, unique=True, nullable=True)
    linkedin = Column(String, unique = True, nullable=True)
    site = Column(String, nullable=True)
    password = Column(String)
    

class StudentTokenEntity(Base):
    __tablename__ = "student_token"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    token = Column(String)
    user_id = Column(Integer, ForeignKey("student_credits.id", ondelete="cascade"), nullable=False)
    expire_date = Column(DateTime)
    

class OrganizationEntity(Base):
    __tablename__ = "organization_credits"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    description = Column(String)
    contacts = Column(String)
    approved = Column(Boolean, default=False)
    specialization = Column(String)
    

class OrganizationToken(Base):
    __tablename__ = "organization_token"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    token = Column(String)
    user_id = Column(Integer, ForeignKey("organization_credits.id", ondelete="cascade"), nullable=False)
    expire_date = Column(DateTime)
    

class AdministratorEntity(Base):
    __tablename__ = "administrator_credits"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    first_name = Column(String(30))
    last_name = Column(String(30))
    

class AdministratorToken(Base):
    __tablename__ = "administrator_token"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    token = Column(String)
    user_id = Column(Integer, ForeignKey("administrator_credits.id", ondelete="cascade"), nullable=False)
    expire_date = Column(DateTime)
    
target_metadata = Base.metadata

