from .db import db, environment, SCHEMA, add_prefix_for_prod

meal_foods = db.Table(
    'meal_foods',
    db.Column('meal_id', db.Integer, db.ForeignKey(add_prefix_for_prod('meals.id'))),
    db.Column('food_id', db.Integer, db.ForeignKey(add_prefix_for_prod('foods.id')))
)

if environment == "production":
    meal_foods.schema = SCHEMA
