from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS  
from database import db
from server.models import user, relationship, habit, habit_log, goal
from werkzeug.security import check_password_hash
from datetime import datetime
# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app, supports_credentials=True, origins="http://127.0.0.1:5173")

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habit_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Habit Tracker API!"})

# Apply CORS headers to all responses
@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


# Extract user_id from Authorization header
def get_user_id():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        print(" No Authorization header found.")
        return None

    try:
        token_parts = auth_header.split(" ")
        if len(token_parts) == 2 and token_parts[0] == "Bearer":
            user_id = int(token_parts[1])
        else:
            user_id = int(auth_header)

        print(f" Extracted User ID: {user_id}")
        return user_id
    except ValueError:
        print(" Invalid User ID format in Authorization header.")
        return None

#  Register User
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

#  Login User
@app.route('/login', methods=['POST'])
def login():
    from models.user import User
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": user.to_dict()
    }), 200

#  Fetch Logged-in User's Habits
@app.route('/habits', methods=['GET'])
def get_habits():
    from models.habit import Habit
    user_id = get_user_id()

    if not user_id:
        return jsonify({"error": "Unauthorized access. Please log in."}), 401

    habits = Habit.query.filter_by(user_id=user_id).all()
    return jsonify([habit.to_dict() for habit in habits]), 200  

#  Add a Habit
@app.route('/habits', methods=['POST'])
def create_habit():
    from models.habit import Habit
    user_id = get_user_id()

    if not user_id:
        return jsonify({"error": "Unauthorized access. Please log in."}), 401

    data = request.json
    if not data or "name" not in data or "frequency" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    new_habit = Habit(name=data["name"], frequency=data["frequency"], user_id=user_id)
    db.session.add(new_habit)
    db.session.commit()

    return jsonify(new_habit.to_dict()), 201

#  DELETE Habit
@app.route('/habits/<int:habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    from models.habit import Habit
    user_id = get_user_id()

    if not user_id:
        return jsonify({"error": "Unauthorized. Please log in."}), 401

    habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
    if not habit:
        return jsonify({"error": "Habit not found or unauthorized"}), 404

    db.session.delete(habit)
    db.session.commit()

    return jsonify({"message": "Habit deleted successfully"}), 200

#  Add a Goal (Only for Logged-in User)
#  Add a Goal (with Debugging)
@app.route('/goals', methods=['POST'])
def add_goal():
    from models.goal import Goal
    from models.habit import Habit
    user_id = get_user_id()  #  Extract user_id from headers

    if not user_id:
        print(" ERROR: Unauthorized access - No user ID found.")
        return jsonify({"error": "Unauthorized access. Please log in."}), 401

    data = request.json
    print("Received Data:", data)  #  Debugging: Print received data

    if not data or "habit_id" not in data or "target_date" not in data or "description" not in data or "target_days" not in data:
        print(" ERROR: Missing required fields")
        return jsonify({"error": "Missing required fields"}), 400

    #  Ensure habit exists and belongs to the logged-in user
    habit = Habit.query.filter_by(id=data["habit_id"], user_id=user_id).first()
    if not habit:
        print(f" ERROR: Habit ID {data['habit_id']} not found or unauthorized")
        return jsonify({"error": "Habit not found or unauthorized."}), 404

    try:
        target_date = datetime.strptime(data["target_date"], "%Y-%m-%d").date()
    except ValueError:
        print(" ERROR: Invalid date format. Expected YYYY-MM-DD.")
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    try:
        #  Create a new goal
        new_goal = Goal(
            habit_id=data["habit_id"],
            user_id=user_id,  #  Ensure user_id is included
            target_date=target_date,
            description=data["description"],
            target_days=data["target_days"],  #  Ensure target_days is provided
            completed=False
        )

        db.session.add(new_goal)
        db.session.commit()

        print(f" SUCCESS: Goal {new_goal.id} created successfully")
        return jsonify(new_goal.to_dict()), 201

    except Exception as e:
        print(f" ERROR: Exception occurred while adding goal: {str(e)}")
        return jsonify({"error": "Failed to add goal", "details": str(e)}), 500


#  Fetch Goals (Fixed Serialization Issue)
@app.route('/goals', methods=['GET'])
def get_goals():
    from models.goal import Goal
    user_id = get_user_id()

    if not user_id:
        return jsonify({"error": "Unauthorized access. Please log in."}), 401

    goals = Goal.query.filter_by(user_id=user_id).all()

    #  Convert goals into JSON (Avoid _sa_instance_state)
    goals_data = [
        {
            "id": goal.id,
            "habit_id": goal.habit_id,
            "user_id": goal.user_id,
            "target_date": goal.target_date.strftime("%Y-%m-%d"),  # Convert date to string
            "description": goal.description,
            "target_days": goal.target_days,
            "completed": goal.completed
        }
        for goal in goals
    ]

    return jsonify(goals_data), 200

#  Fetch Relationships
@app.route('/relationships', methods=['GET'])
def get_relationships():
    from models.relationship import Relationship
    user_id = get_user_id()

    if not user_id:
        return jsonify({"error": "Unauthorized access. Please log in."}), 401

    relationships = Relationship.query.filter_by(user_id=user_id).all()
    return jsonify([relationship.to_dict() for relationship in relationships]), 200

#  Add a Relationship
@app.route('/relationships', methods=['POST'])
def create_relationship():
    from models.relationship import Relationship
    user_id = get_user_id()

    if not user_id:
        return jsonify({"error": "Unauthorized access. Please log in."}), 401

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