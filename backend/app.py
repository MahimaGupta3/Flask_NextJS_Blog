from flask import Flask, jsonify, render_template, request, url_for, flash, redirect, abort
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime, timezone
import pymongo
import sys
from pymongo.server_api import ServerApi

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
    # print(records)
    return jsonify(records)


@app.route('/post/<post_id>', methods=['GET'])
def get_post(post_id):
    try:
        # Query the MongoDB collection for the post with the specified post_id
        post = Blog_Post.find_one({"post_id": post_id})
        
        if post:
            # Remove the MongoDB internal ID field (_id) before returning the result
            post['_id'] = str(post['_id'])  # Convert the ObjectId to string
            return jsonify(post), 200
        else:
            return jsonify({"message": "Post not found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500




    

# @app.route('/')
# def index():
#     try:
#         db = client.get_database()
#         print(db)
#         print("Pinged your deployment. You successfully connected to MongoDB!")
#     except Exception as e:
#         print(e)
#     posts = conn.execute('SELECT * FROM posts').fetchall()
#     conn.close()
#     return render_template('index.html', posts=posts)

@app.route('/api', methods=['GET'])
def get_message():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=2000)







    