from database import db
from sqlalchemy_serializer import SerializerMixin

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    target_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    target_days = db.Column(db.Integer, nullable=False)
    completed = db.Column(db.Boolean, default=False)

    # One-to-One Relationship with Habit (Prevents recursion)
    habit = db.relationship('Habit', back_populates='goal', uselist=False)

    # Fix infinite recursion in serialization
    serialize_rules = ("-habit.goal",)

    def __init__(self, habit_id, user_id, target_date, description, target_days, completed=False):
        self.habit_id = habit_id
        self.user_id = user_id
        self.target_date = target_date
        self.description = description
        self.target_days = target_days
        self.completed = completed

    def save(self):
        """Save goal to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete goal from the database."""
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        """Convert Goal object to dictionary while preventing recursion"""
        return {
            "id": self.id,
            "habit_id": self.habit_id,
            "user_id": self.user_id,
            "target_date": self.target_date.strftime("%Y-%m-%d"),  # ✅ Convert date to string
            "description": self.description,
            "target_days": self.target_days,
            "completed": self.completed,
        }
