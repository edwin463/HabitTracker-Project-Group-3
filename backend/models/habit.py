from database import db
from sqlalchemy_serializer import SerializerMixin

class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(255))

    # One-to-Many: A Habit can have many HabitLogs
    logs = db.relationship('HabitLog', back_populates='habit', cascade="all, delete-orphan")

    # One-to-One: A Habit can have one Goal (Prevent recursion)
    goal = db.relationship('Goal', back_populates='habit', uselist=False)

    # Prevent infinite recursion while keeping useful data
    serialize_rules = ("-goal.habit", "-logs.habit")

    def __init__(self, name, frequency, user_id, description=None):
        self.name = name
        self.frequency = frequency
        self.user_id = user_id
        self.description = description

    def save(self):
        """Save habit to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete habit from the database."""
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        """Convert Habit object to dictionary while preventing recursion"""
        return {
            "id": self.id,
            "name": self.name,
            "frequency": self.frequency,
            "user_id": self.user_id,
            "description": self.description,
            "goal_id": self.goal.id if self.goal else None,  # ✅ Store only goal_id, not full object
        }
