FROM python:3.9
WORKDIR /backend
COPY . /backend
RUN pip install -r requirements.txt
EXPOSE 8000
CMD python migration.py; uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
