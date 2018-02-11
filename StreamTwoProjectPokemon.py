from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGO_HOST = 'localhost'
MONGO_PORT = 27017
DBS_NAME = 'pokemonData'
COLLECTION_NAME = 'pokemon'


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
