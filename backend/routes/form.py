from fastapi import APIRouter, FastAPI, Depends
from domain.schemas.form import SchemaForm, SchemaFormCreate
from typing import List
from config.mongo import collection
from sqlalchemy.orm import Session
from infrastructure.database import get_db
from infrastructure.models.answer import ModelAnswer
from infrastructure.models.conditional_logic import ModelConditionalLogic
from infrastructure.models.form import ModelForm
from infrastructure.models.question import ModelQuestion
ROUTE_NAME = "form"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])

def FormRouter(api_server: FastAPI):
    api_server.include_router(api_router)


@api_router.get('/')
def Get(id:int):
    return "helloworld" + id

@api_router.get("/list", response_model=List[SchemaForm])
def List(db: Session = Depends(get_db)):
    return db.query(ModelForm).all()


@api_router.post("/")
def Create(form: SchemaFormCreate, db: Session = Depends(get_db)):

    if len(form.list_questions) == 0:
        return {"error": "No questions"}
    
    #result = collection.insert_one(form.model_dump())# <- MongoDB return {"id": str(result.inserted_id)}
    new_form = ModelForm(**form.model_dump(exclude={"list_questions"}))
    
    db.add(new_form)
    db.flush()# <- Get ID Form

    for question in form.list_questions:
        if len(question.list_answers) == 0:
            return {"error": "No answers: for question " + str(question.text)}
        
        new_question = ModelQuestion(**question.model_dump(exclude={"list_answers", "conditional_logic"}), id_form = new_form.id)#TODO: Multi Insert
        db.add(new_question)
        db.flush()# <- Get ID Question

        for answer in question.list_answers:
            new_answer = ModelAnswer(**answer.model_dump(), id_question = new_question.id)
            db.add(new_answer)

        new_conditional_logic = ModelConditionalLogic(
            **question.conditional_logic.model_dump(),
            id_question = new_question.id)

        db.add(new_conditional_logic)
    
    db.commit()
    #db.refresh
    return {"id":new_form.id}