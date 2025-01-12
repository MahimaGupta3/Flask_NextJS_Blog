from flask import jsonify, Blueprint, abort, request, redirect, make_response
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from db import Connection

admin_bp = Blueprint('admin', __name__)

db = Connection('flask_db')
User = db['user']
Blog_Post = db['blog_post']

@admin_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if User.find_one({"username": data.get('username')}):
        return jsonify({"message": "User already exists"})

    # Validate input data
    if not data.get('username') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400

    # Hash the password
    hashed_password = generate_password_hash(data['password'])

    # Create a new user document
    user = {
        "username": data['username'],
        "password": hashed_password
    }

    # Insert the user into MongoDB
    try:
        User.insert_one(user)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def authenticate_user(username, password):
    
    user = User.find_one({"username": username})
    
    if user and check_password_hash(user["password"], password):
        return user
    else:
        return None

def generate_token(user):
    access_token = create_access_token(identity=str(user["_id"]))
    return access_token

@admin_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    user = authenticate_user(username, password)
    
    if user:
        token = generate_token(user)
        return jsonify({"access_token": token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
@admin_bp.route('/admin')
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

@admin_bp.route('/admin/post/<post_id>')
def post(post_id):
    post = get_post(post_id)
    if post:
        return jsonify(post)
    else:
        return jsonify({'error': 'Post not found'}), 404
    
@admin_bp.route('/logout', methods=['POST'])
def logout():
    # Clear the access token cookie
    response = make_response(redirect('/'))  # Redirect to homepage
    response.delete_cookie('access_token')   # Remove the access token cookie
    return response