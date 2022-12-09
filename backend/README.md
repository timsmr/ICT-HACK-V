Инструкция по запуску docker контейнера
sudo docker-compose up -d --build
для выбора порта необходимо изменить docker-compose
    ports:
      - "port_you_want_to_use:8000"
стандартный порт для деплоя бэкенда - 8000





очень рекомендую установить insomnia и импортировать туда документ с запросами (позволяют создать лобби, юзера и гостя), полную документацию по апи сделаю когда-нибудь



Для разработки
1. pip install -r requirements
2. создать пустую базу данных в postgres
2. в файлах alembic_/env.py и app/dbManager/dbManager.py в переменных окружения
задать настройки для подключения к своей базе данных
4. python migration.py
5. uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload



создать миграцию после обновления моделей бд
alembic revision --autogenerate -m "migration_name"
выполнить миграцию
python migration.py
