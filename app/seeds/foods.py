from app.models import db, Food, environment, SCHEMA
from sqlalchemy.sql import text

def seed_foods():
    chicken_breast = Food(
        name='Chicken Breast',
        serving_size=112,
        calories=140,
        carbs=0,
        proteins=25,
        fats=4,
        user_id=2
    )

    egg = Food(
        name='Egg',
        serving_size=50,
        calories=70,
        carbs=0,
        proteins=6,
        fats=5,
        user_id=2
    )

    salmon = Food(
        name='Salmon',
        serving_size=196,
        calories=340,
        carbs=0,
        proteins=37,
        fats=20,
        user_id=2
    )

    sweet_potato = Food(
        name='Sweet Potato',
        serving_size=130,
        calories=130,
        carbs=33,
        proteins=2,
        fats=0,
        user_id=2
    )

    white_rice = Food(
        name='White Rice',
        serving_size=45,
        calories=160,
        carbs=35,
        proteins=3,
        fats=0,
        user_id=2
    )

    broccoli = Food(
        name='Broccoli',
        serving_size=85,
        calories=30,
        carbs=6,
        proteins=2,
        fats=0,
        user_id=2
    )

    spinach = Food(
        name='Spinach',
        serving_size=85,
        calories=20,
        carbs=3,
        proteins=2,
        fats=0,
        user_id=2
    )

    oats = Food(
        name='Quaker Old Fashioned Oats',
        serving_size=40,
        calories=150,
        carbs=27,
        proteins=5,
        fats=3,
        user_id=2
    )

    banana = Food(
        name='Banana',
        serving_size=100,
        calories=110,
        carbs=28,
        proteins=1,
        fats=0,
        user_id=2
    )

    milk2 = Food(
        name='2% Milk',
        serving_size=240,
        calories=130,
        carbs=12,
        proteins=8,
        fats=5,
        user_id=2
    )

    whole_milk = Food(
        name='Whole Milk',
        serving_size=240,
        calories=150,
        carbs=12,
        proteins=8,
        fats=8,
        user_id=2
    )

    pb = Food(
        name='Peanut Butter',
        serving_size=32,
        calories=190,
        carbs=6,
        proteins=7,
        fats=16,
        user_id=2
    )

    whole_bread = Food(
        name= "Dave's Killer Whole Grain Bread",
        serving_size=45,
        calories=110,
        carbs=22,
        proteins=5,
        fats=2,
        user_id=2
    )

    farfalle = Food(
        name='Farfalle',
        serving_size=56,
        calories=200,
        carbs=42,
        proteins=7,
        fats=1,
        user_id=2
    )

    avocado = Food(
        name='Avocado',
        serving_size=50,
        calories=240,
        carbs=13,
        proteins=3,
        fats=22,
        user_id=2
    )

    protein_powder = Food(
        name='Protein Powder',
        serving_size=32,
        calories=120,
        carbs=3,
        proteins=24,
        fats=2,
        user_id=2
    )

    db.session.add(chicken_breast)
    db.session.add(egg)
    db.session.add(salmon)
    db.session.add(sweet_potato)
    db.session.add(white_rice)
    db.session.add(broccoli)
    db.session.add(spinach)
    db.session.add(oats)
    db.session.add(banana)
    db.session.add(milk2)
    db.session.add(whole_milk)
    db.session.add(pb)
    db.session.add(whole_bread)
    db.session.add(farfalle)
    db.session.add(avocado)
    db.session.add(protein_powder)
    db.session.commit()

def undo_foods():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.foods RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM foods"))

    db.session.commit()
