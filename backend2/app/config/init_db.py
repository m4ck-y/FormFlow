from app.form.infrastructure.database.init import init as init_form
from app.config.db import Base, engine

def init_db():
    print("init >>> db ... ")
    init_form()
    #...
    Base.metadata.create_all(bind=engine)
    #SeederHealth()

print("app/config/init_db.py")