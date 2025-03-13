from fastapi import FastAPI
from config.env import API_HOST, API_PORT
import infrastructure.models.init_db
from routes.form import FormRouter
import uvicorn

app = FastAPI()

FormRouter(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=True)

#python main.py
#uvicorn main:app --host 0.0.0.0 --port 8030 --reload #TODO: DEFINIR PUERTO