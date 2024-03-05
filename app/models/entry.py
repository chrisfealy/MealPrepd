from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Entry(db.Model):
    __tablename__ = 'entries'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="entries")
    meals = db.relationship('Entry', secondary='entry_meals', back_populates='entries')
    foods = db.relationship('Entry', secondary='entry_foods', back_populates='entries')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
