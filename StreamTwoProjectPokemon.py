from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'pokemonData')
COLLECTION_NAME = 'pokemon_data'


@app.route('/')
def home():
    """
    Flask view to serve the first dashboard page
    """
    return render_template("home.html")


@app.route("/pokemonData/pokemon")
def pokemon_data():
    """
    Flask view to serve the pokemon data from MongoDB
    in JSON format
    """

    # a constant that defines the record fields we want to get
    FIELDS = {
        '_id': False,
        'id': True,
        'Name': True,
        'Type 1': True,
        'Type 2': True,
        'Total': True,
        'HP': True,
        'Attack': True,
        'Defense': True,
        'Sp Atk': True,
        'Sp Def': True,
        'Speed': True,
        'Generation': True,
        'Legendary': True
    }

    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        pokemon = collection.find(projection=FIELDS, limit=1000)
        return json.dumps(list(pokemon))


if __name__ == '__main__':
    app.run(debug=True)
