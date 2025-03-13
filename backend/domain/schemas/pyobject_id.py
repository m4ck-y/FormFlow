from bson.objectid import ObjectId

class PyObjectId(ObjectId):
    """Convierte el ObjectId de MongoDB a str en la salida"""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)