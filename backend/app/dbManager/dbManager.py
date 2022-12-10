from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from os import environ
db_username = environ.get("DB_USER", "postgres")
db_password = environ.get("DB_PASSWORD", "password")
db_name = environ.get("DB_NAME", "ICT-HACK-V")

db_host = environ.get("DB_HOST", "localhost")
engine = create_engine(f'postgresql://{db_username}:{db_password}@{db_host}:5432/{db_name}')


session = Session(engine)




