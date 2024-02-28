from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Meal(db.Model):
    __tablename__ = 'meals'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship("User", back_populates="meals")
    foods = db.relationship('Food', secondary = 'meal_foods', back_populates='meals')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'foods': [food.to_dict() for food in self.foods]
        }
