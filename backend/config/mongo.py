from pymongo import MongoClient

conn = MongoClient("mongodb://localhost:27017")

db = conn["libersalus"]

collection = db["form"]