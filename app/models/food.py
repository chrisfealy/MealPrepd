from .db import db, environment, SCHEMA

class Food(db.Model):
    __tablename__ = 'foods'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    serving_size = db.Column(db.Integer, nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    carbs = db.Column(db.Integer, nullable=False)
    proteins = db.Column(db.Integer, nullable=False)
    fats = db.Column(db.Integer, nullable=False)

    meals = db.relationship('Meal', secondary='meal_foods', back_populates='foods')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'calories': self.calories,
            'carbs': self.carbs,
            'proteins': self.proteins,
            'fats': self.fats
        }
