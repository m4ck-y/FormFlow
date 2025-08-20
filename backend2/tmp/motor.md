config.py:
python
Copiar
import motor.motor_asyncio
from pydantic import BaseSettings

class Settings(BaseSettings):
    mongodb_url: str = "mongodb://localhost:27017"  # URL de conexión a MongoDB
    mongodb_db: str = "test"  # Nombre de la base de datos

    class Config:
        env_file = ".env"

settings = Settings()

# Conexión a MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongodb_url)
database = client[settings.mongodb_db]
mongodb_url: La URL de tu base de datos MongoDB. Por defecto es mongodb://localhost:27017.
mongodb_db: El nombre de la base de datos a la que quieres conectarte.
El cliente AsyncIOMotorClient es asincrónico, lo que significa que puedes usarlo en un entorno asincrónico como FastAPI sin bloquear el servidor.

Paso 3: Crear el esquema de datos (Modelo)
Utilizamos Pydantic para definir los modelos de datos que serán enviados y recibidos a través de la API. El modelo de Pydantic ayuda a validar y documentar las solicitudes de la API.

models.py:
python
Copiar
from pydantic import BaseModel, Field
from typing import Optional

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    in_stock: bool = True

    class Config:
        schema_extra = {
            "example": {
                "name": "Producto Ejemplo",
                "description": "Una descripción del producto",
                "price": 19.99,
                "in_stock": True
            }
        }
Paso 4: Crear los endpoints de la API
Ahora que tenemos el esquema y la configuración de la base de datos, vamos a crear los endpoints de FastAPI para interactuar con MongoDB.

main.py:
python
Copiar
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from config import database
from models import Item

app = FastAPI()

# Función para obtener una colección de MongoDB
def get_collection(name: str):
    return database[name]

# Crear un nuevo producto
@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    item_dict = item.dict()
    collection = get_collection("items")
    result = await collection.insert_one(item_dict)
    item.id = str(result.inserted_id)
    return item

# Obtener todos los productos
@app.get("/items/", response_model=List[Item])
async def get_items():
    collection = get_collection("items")
    items_cursor = collection.find()
    items = await items_cursor.to_list(length=100)
    return items

# Obtener un producto por ID
@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: str):
    collection = get_collection("items")
    item = await collection.find_one({"_id": item_id})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Actualizar un producto
@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item):
    collection = get_collection("items")
    updated_item = await collection.find_one_and_update(
        {"_id": item_id},
        {"$set": item.dict()},
        return_document=True
    )
    if updated_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated_item

# Eliminar un producto
@app.delete("/items/{item_id}", response_model=Item)
async def delete_item(item_id: str):
    collection = get_collection("items")
    deleted_item = await collection.find_one_and_delete({"_id": item_id})
    if deleted_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return deleted_item
Explicación del código:
create_item: Inserta un nuevo producto en la base de datos.
get_items: Obtiene todos los productos de la base de datos.
get_item: Obtiene un producto por su ID.
update_item: Actualiza un producto existente.
delete_item: Elimina un producto por su ID.
Paso 5: Correr la aplicación
Ahora puedes correr la aplicación con Uvicorn:

bash
Copiar
uvicorn main:app --reload
Esto lanzará el servidor de desarrollo de FastAPI en http://127.0.0.1:8000.

Paso 6: Probar la API
Accede a la interfaz interactiva de documentación de FastAPI en http://127.0.0.1:8000/docs para probar los diferentes endpoints de la API.