from flask import Flask, jsonify, render_template, request, url_for, flash, redirect, abort
from flask_cors import CORS
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
CORS(app)  # Enable CORS for all routes

load_dotenv()

# DB Connection
uri = os.getenv("DB_URL")
# print(uri)
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    db = client.get_database()
    print(db)
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Flask!")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=2000)