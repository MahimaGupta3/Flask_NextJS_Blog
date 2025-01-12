from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from main import main_bp
from admin import admin_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
jwt = JWTManager(app)
load_dotenv()
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

app.register_blueprint(main_bp)
app.register_blueprint(admin_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=2000)