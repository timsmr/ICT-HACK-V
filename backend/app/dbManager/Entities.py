from sqlalchemy import Column, Boolean, Integer, String, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Sequence
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship


Base = declarative_base()


class StudentEntity(Base):
    __tablename__ = "student"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    first_name = Column(String(30))
    last_name = Column(String(30))
    bio = Column(String, nullable=True)
    education = Column(String, nullable=True)
    hard_soft_skills = Column(String, nullable=True)
    projects = Column(String, nullable=True)
    telegram = Column(String, unique=True, nullable=True)
    email = Column(String, unique=True)
    phone_number = Column(String, unique=True)
    linkedin = Column(String, unique = True, nullable=True)
    site = Column(String, nullable=True, )
    password = Column(String)
    

class StudentTokenEntity(Base):
    __tablename__ = "student_token"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    token = Column(String)
    user_id = Column(Integer, ForeignKey("student.id", ondelete="cascade"), nullable=False)
    expire_date = Column(DateTime)
    

class OrganizationEntity(Base):
    __tablename__ = "organization"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    description = Column(String)
    email = Column(String, unique=True)
    contacts = Column(String)
    approved = Column(Boolean, default=False)
    specialization = Column(String)
    password = Column(String)
    

class OrganizationTokenEntity(Base):
    __tablename__ = "organization_token"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    token = Column(String)
    user_id = Column(Integer, ForeignKey("organization.id", ondelete="cascade"), nullable=False)
    expire_date = Column(DateTime)
    

class AdminEntity(Base):
    __tablename__ = "administrator"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    first_name = Column(String(30))
    last_name = Column(String(30))
    email = Column(String, unique=True)
    password = Column(String)
    

class AdminTokenEntity(Base):
    __tablename__ = "administrator_token"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    token = Column(String)
    user_id = Column(Integer, ForeignKey("administrator.id", ondelete="cascade"), nullable=False)
    expire_date = Column(DateTime)
    
    
class PetProjectEntity(Base):
    __tablename__ = "pet_project"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    description = Column(String)
    student_id = Column(Integer, ForeignKey("student.id", ondelete="cascade"), nullable=False)
    

class ProjectMemberEntity(Base):
    __tablename__ = "project_member"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("student.id", ondelete="cascade"), nullable=False)
    pet_project_id = Column(Integer, ForeignKey("pet_project.id", ondelete="cascade"), nullable=True)
    role = Column(String)
    
    
class ResponseEntity(Base):
    __tablename__ = "student_response"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("student.id", ondelete="cascade"), nullable=False)
    pet_project_id = Column(Integer, ForeignKey("pet_project.id", ondelete="cascade"), nullable=True)
    message = Column(String)
    accepted = Column(Boolean, nullable=True)
    
    
class PositionEntity(Base):
    __tablename__  = "position"
    
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    description = Column(String, nullable=True)
    requirements = Column(String, nullable=True)
    organization_id = Column(Integer, ForeignKey("organization.id", ondelete="cascade"))
    is_active = Column(Boolean, default=True)
    salary = Column(String)
    
    
target_metadata = Base.metadata

