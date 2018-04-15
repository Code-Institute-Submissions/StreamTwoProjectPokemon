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

    with MongoClient(MONGO_HOST, MONGO_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        pokemon = collection.find(projection=FIELDS, limit=1000)
        return json.dumps(list(pokemon))


if __name__ == '__main__':
    app.run(debug=True)
