import os

SECRET_KEY = os.environ.get("SECRET_KEY", "change_on_prod")
CHUNK_API = os.environ.get("CHUNK_API", "https://api.chucknorris.io/jokes")
