from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from database import db
from models import user, relationship, habit, habit_log, goal
from werkzeug.security import check_password_hash
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# CORS Configuration
CORS(app, supports_credentials=True, origins="http://127.0.0.1:5173")

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habit_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Replace with a strong secret key
jwt = JWTManager(app)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Habit Tracker API!"})

# Enable CORS for all routes
@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# Register User
@app.route('/register', methods=['POST'])
def register():
    from models.user import User
    data = request.json

    if not data or "username" not in data or "email" not in data or "password" not in data:
        return jsonify({"error": "Missing username, email, or password"}), 400

    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    new_user = User(username=data["username"], email=data["email"], password=data["password"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user": new_user.to_dict()}), 201

# Login User & Return JWT Token
@app.route('/login', methods=['POST'])
def login():
    from models.user import User
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT Token
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

# Fetch Logged-in User's Habits
@app.route('/habits', methods=['GET'])
@jwt_required()
def get_habits():
    from models.habit import Habit
    user_id = get_jwt_identity()

    habits = Habit.query.filter_by(user_id=user_id).all()
    return jsonify([habit.to_dict() for habit in habits]), 200  

# Add a Habit
@app.route('/habits', methods=['POST'])
@jwt_required()
def create_habit():
    from models.habit import Habit
    user_id = get_jwt_identity()

    data = request.json
    if not data or "name" not in data or "frequency" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    new_habit = Habit(name=data["name"], frequency=data["frequency"], user_id=user_id)
    db.session.add(new_habit)
    db.session.commit()

    return jsonify(new_habit.to_dict()), 201

# DELETE Habit
@app.route('/habits/<int:habit_id>', methods=['DELETE'])
@jwt_required()
def delete_habit(habit_id):
    from models.habit import Habit
    user_id = get_jwt_identity()

    habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
    if not habit:
        return jsonify({"error": "Habit not found or unauthorized"}), 404

    db.session.delete(habit)
    db.session.commit()

    return jsonify({"message": "Habit deleted successfully"}), 200

# Add a Goal
@app.route('/goals', methods=['POST'])
@jwt_required()
def add_goal():
    from models.goal import Goal
    from models.habit import Habit
    user_id = get_jwt_identity()

    data = request.json
    if not data or "habit_id" not in data or "target_date" not in data or "description" not in data or "target_days" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    habit = Habit.query.filter_by(id=data["habit_id"], user_id=user_id).first()
    if not habit:
        return jsonify({"error": "Habit not found or unauthorized."}), 404

    try:
        target_date = datetime.strptime(data["target_date"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    new_goal = Goal(
        habit_id=data["habit_id"],
        user_id=user_id,
        target_date=target_date,
        description=data["description"],
        target_days=data["target_days"],
        completed=False
    )

    db.session.add(new_goal)
    db.session.commit()

    return jsonify(new_goal.to_dict()), 201

# Fetch Goals
@app.route('/goals', methods=['GET'])
@jwt_required()
def get_goals():
    from models.goal import Goal
    user_id = get_jwt_identity()

    goals = Goal.query.filter_by(user_id=user_id).all()
    goals_data = [
        {
            "id": goal.id,
            "habit_id": goal.habit_id,
            "user_id": goal.user_id,
            "target_date": goal.target_date.strftime("%Y-%m-%d"),
            "description": goal.description,
            "target_days": goal.target_days,
            "completed": goal.completed
        }
        for goal in goals
    ]

    return jsonify(goals_data), 200

# Fetch Relationships
@app.route('/relationships', methods=['GET'])
@jwt_required()
def get_relationships():
    from models.relationship import Relationship
    user_id = get_jwt_identity()

    relationships = Relationship.query.filter_by(user_id=user_id).all()
    return jsonify([relationship.to_dict() for relationship in relationships]), 200

# Add a Relationship
@app.route('/relationships', methods=['POST'])
@jwt_required()
def create_relationship():
    from models.relationship import Relationship
    user_id = get_jwt_identity()

    data = request.json
    if not data or "partner_id" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    new_relationship = Relationship(user_id=user_id, partner_id=data["partner_id"])
    db.session.add(new_relationship)
    db.session.commit()

    return jsonify(new_relationship.to_dict()), 201

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
