from app.models import db, meal_foods, environment, SCHEMA
from sqlalchemy.sql import text

def seed_meal_foods():
    meal_food_data = [
        {'meal_id': 1, 'food_id': 1},
        {'meal_id': 1, 'food_id': 5},
        {'meal_id': 1, 'food_id': 6},
        {'meal_id': 2, 'food_id': 3},
        {'meal_id': 2, 'food_id': 4},
        {'meal_id': 2, 'food_id': 6},
        {'meal_id': 3, 'food_id': 16},
        {'meal_id': 3, 'food_id': 11},
        {'meal_id': 3, 'food_id': 8},
        {'meal_id': 3, 'food_id': 9},
        {'meal_id': 3, 'food_id': 12},
        {'meal_id': 4, 'food_id': 13},
        {'meal_id': 4, 'food_id': 15},
        {'meal_id': 4, 'food_id': 2}
    ]

    db.session.execute(meal_foods.insert(), meal_food_data)
    db.session.commit()

def undo_meal_foods():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meal_foods RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meal_foods"))

    db.session.commit()
