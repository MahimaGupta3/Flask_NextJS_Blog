from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class Connection:
    def __new__(cls, database):
        uri = os.getenv("DB_URL")
        connection=MongoClient(uri)
        return connection[database]