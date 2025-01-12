from flask import jsonify, Blueprint, abort
from datetime import datetime, timezone
from pymongo.server_api import ServerApi
from bson import ObjectId
from db import Connection

main_bp = Blueprint('main', __name__)

db = Connection('flask_db')

# Creating the collection for DB
current_time_utc = datetime.now(timezone.utc)
Blog_Post = db['blog_post']

@main_bp.route('/')
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

@main_bp.route('/post/<post_id>')
def post(post_id):
    post = get_post(post_id)
    if post:
        return jsonify(post)
    else:
        return jsonify({'error': 'Post not found'}), 404
        

# @app.route('/api', methods=['GET'])
# def get_message():
#     return jsonify({"message": "Hello from Flask!"})









    