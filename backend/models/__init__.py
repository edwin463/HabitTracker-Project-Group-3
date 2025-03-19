from database import db
from .user import User
from .habit import Habit
from .habit_log import HabitLog
from .goal import Goal
from .relationship import Relationship

def init_app(app):
    """Initialize the database with the Flask app."""
    db.init_app(app)

