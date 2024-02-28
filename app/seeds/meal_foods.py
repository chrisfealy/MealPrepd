from app.models import db, meal_foods, environment, SCHEMA
from sqlalchemy.sql import text

def seed_meal_foods():
    meal_food_data = [
        {'meal_id': 1, 'food_id': 1},
        {'meal_id': 1, 'food_id': 5},
        {'meal_id': 1, 'food_id': 6},
        {'meal_id': 2, 'food_id': 3},
        {'meal_id': 2, 'food_id': 4},
        {'meal_id': 2, 'food_id': 6}
    ]

    db.session.execute(meal_foods.insert(), meal_food_data)
    db.session.commit()

def undo_meal_foods():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meal_foods RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meal_foods"))

    db.session.commit()
