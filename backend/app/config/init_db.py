from app.form.infrastructure.database.init import init as init_form
from app.question.infrastructure.database.init import init as init_question
from app.section.infrastructure.database.init import init as init_section

from app.config.db import Base, engine, is_db_postgres, CreateSchema

def init_db():
    print("init >>> db ... ")

    if is_db_postgres():
        CreateSchema("form")
    
    init_form()
    init_section()
    init_question()
    #...
    Base.metadata.create_all(bind=engine)
    #SeederHealth()

print("app/config/init_db.py")