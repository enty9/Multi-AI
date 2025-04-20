import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_URI = os.getenv("DATABASE_URL", "http://basedans")
    CORS_HEADERS = "Content-Type"

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    DATABASE_URI = os.getenv("PROD_DB_URL")