from faker import Faker
from database import db
from app import app
from models.user import User
from models.habit import Habit
from models.habit_log import HabitLog
from models.goal import Goal
from models.relationship import Relationship  # Import Relationship model
import random

# Initialize Faker
fake = Faker()

# Run inside Flask app context
with app.app_context():
    print("Seeding database with Faker data...")

    # Clear existing data (optional)
    db.session.query(Relationship).delete()
    db.session.query(Goal).delete()
    db.session.query(HabitLog).delete()
    db.session.query(Habit).delete()
    db.session.query(User).delete()
    db.session.commit()

    # Create Users
    users = []
    for _ in range(5):  # Generate 5 users
        user = User(username=fake.user_name(), email=fake.email())
        db.session.add(user)
        users.append(user)

    db.session.commit()

    # Create Habits
    habits = []
    for user in users:
        for _ in range(2):  # Each user gets 2 habits
            habit = Habit(
                name=fake.word().capitalize(),
                frequency=random.choice(["Daily", "Weekly", "Monthly"]),
                user_id=user.id
            )
            db.session.add(habit)
            habits.append(habit)

    db.session.commit()

    # Create Habit Logs
    for habit in habits:
        for _ in range(3):  # Each habit has 3 logs
            log = HabitLog(
                habit_id=habit.id,
                date=fake.date_this_year(),
                status=random.choice([True, False])
            )
            db.session.add(log)

    db.session.commit()

    # Create Goals
    for habit in habits:
        goal = Goal(
    habit_id=habit.id,
    target_days=random.randint(10, 30),
    target_date=fake.future_date(),
    description=fake.sentence(),
    completed=random.choice([True, False])
)

        db.session.add(goal)

    db.session.commit()

    # Create Friend Relationships (Many-to-Many)
    relationships = []
    for _ in range(5):  # Create 5 random relationships
        user1, user2 = random.sample(users, 2)  # Pick two different users
        relationship = Relationship(
            user1_id=user1.id,
            user2_id=user2.id,
            status=random.choice(["pending", "accepted", "rejected"])
        )
        db.session.add(relationship)
        relationships.append(relationship)

    db.session.commit()

    print("Seeding completed successfully!")
