from flask import Flask, jsonify, render_template, request, url_for, flash, redirect, abort
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime, timezone
from pymongo.server_api import ServerApi
from bson import ObjectId

from db import Connection

app = Flask(__name__)
db = Connection('flask_db')
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
CORS(app)  # Enable CORS for all routes

load_dotenv()

# Creating the collection for DB
current_time_utc = datetime.now(timezone.utc)
Blog_Post = db['blog_post']

@app.route('/')
def index():
    documents = Blog_Post.find()
    records = []
    for document in documents:
        document["_id"] = str(document["_id"])
        records.append(document)
    return jsonify(records)

def get_post(post_id):
    post = Blog_Post.find_one({"_id": ObjectId(post_id)})
    post["_id"] = str(post["_id"])
    if post is None:
        abort(404)
    return post

@app.route('/post/<post_id>')
def post(post_id):
    post = get_post(post_id)
    if post:
        return jsonify(post)
    else:
        return jsonify({'error': 'Post not found'}), 404
        

@app.route('/api', methods=['GET'])
def get_message():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=2000)







    