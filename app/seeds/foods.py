from app.models import db, Food, environment, SCHEMA
from sqlalchemy.sql import text

def seed_foods():
    chicken_breast = Food(
        name='Chicken Breast',
        serving_size=112,
        calories=140,
        carbs=0,
        proteins=25,
        fats=4
    )

    egg = Food(
        name='Egg',
        serving_size=50,
        calories=70,
        carbs=0,
        proteins=6,
        fats=5
    )

    salmon = Food(
        name='Salmon',
        serving_size=196,
        calories=340,
        carbs=0,
        proteins=37,
        fats=20
    )

    sweet_potato = Food(
        name='Sweet Potato',
        serving_size=130,
        calories=130,
        carbs=33,
        proteins=2,
        fats=0
    )

    white_rice = Food(
        name='White Rice',
        serving_size=45,
        calories=160,
        carbs=35,
        proteins=3,
        fats=0
    )

    broccoli = Food(
        name='Broccoli',
        serving_size=85,
        calories=30,
        carbs=6,
        proteins=2,
        fats=0
    )

    spinach = Food(
        name='Spinach',
        serving_size=85,
        calories=20,
        carbs=3,
        proteins=2,
        fats=0
    )

    db.session.add(chicken_breast)
    db.session.add(egg)
    db.session.add(salmon)
    db.session.add(sweet_potato)
    db.session.add(white_rice)
    db.session.add(broccoli)
    db.session.add(spinach)
    db.session.commit()

def undo_foods():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.foods RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM foods"))

    db.session.commit()
