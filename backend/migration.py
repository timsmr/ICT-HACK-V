from sqlalchemy_utils import database_exists
from time import sleep
from app.dbManager.dbManager import engine
from alembic.config import Config
from alembic import command


if __name__ == "__main__":
    while not database_exists(engine.url):
        sleep(5)
        print("database does not ready")
    with engine.begin() as connection:
        if database_exists(engine.url):
            print("successfully connected")
            alembic_cfg = Config("alembic.ini")
            alembic_cfg.attributes['connection'] = connection
            command.upgrade(alembic_cfg, "head")
            