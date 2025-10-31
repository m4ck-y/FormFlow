from app.form.infrastructure.database.init import init as init_form, seeder_form
from app.question.infrastructure.database.init import init as init_question
from app.section.infrastructure.database.init import init as init_section
from app.assignment.infrastructure.database.init import init as init_assignment, seeder_assignment

from app.config.db import Base, engine, is_db_postgres, CreateSchema
from app.utils.log import log_info, log_info_cyan

def init_db():

    log_info("Initializing database...")
    
    init_form()
    init_section()
    init_question()
    init_assignment()

    Base.metadata.create_all(bind=engine)

    seeder_form()
    seeder_assignment()

log_info_cyan("app/config/init_db.py")

if is_db_postgres():
    CreateSchema("form", "account")