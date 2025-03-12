from fastapi import APIRouter
from domain.schemas.form import SchemaForm, SchemaFormCreate
from typing import List
from config.db import collection

router = APIRouter()

@router.get('/')
def Get(id:int):
    return "helloworld" + id

@router.get("/list", response_model=list[SchemaForm])
def List():
    #return conn.local.form.find()
    pass

@router.post("/")
def Create(form: SchemaFormCreate):
    result = collection.insert_one(form.model_dump())

    return {"id": str(result.inserted_id)}