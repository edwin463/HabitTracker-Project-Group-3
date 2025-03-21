from database import db
from sqlalchemy_serializer import SerializerMixin

class Relationship(db.Model, SerializerMixin):
    __tablename__ = 'relationships'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(50), default="pending")  # pending, accepted, rejected

    # Relationships with User (Many-to-Many via Relationship Table)
    user1 = db.relationship('User', foreign_keys=[user1_id], back_populates='sent_requests', lazy="joined", overlaps="sender")
    user2 = db.relationship('User', foreign_keys=[user2_id], back_populates='received_requests', lazy="joined", overlaps="receiver")

    def __init__(self, user1_id, user2_id, status="pending"):
        self.user1_id = user1_id
        self.user2_id = user2_id
        self.status = status

    def save(self):
        """Save relationship to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete relationship from the database."""
        db.session.delete(self)
        db.session.commit()
