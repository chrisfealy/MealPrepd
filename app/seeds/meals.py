from app.models import db, Meal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_meals():
    chicken_and_rice = Meal(
        name='Chicken and Rice',
        image_url='https://media.blueapron.com/recipes/21573/square_newsletter_images/1551808633-426-0022-9358/0408_FPP_Chicken-Terriyaki_037_Square.jpg?quality=80&width=850&format=pjpg',
        user_id=1
    )
    salmon_rice_bowl = Meal(
        name='Salmon and Sweet Potatoes',
        image_url='https://www.theproducemoms.com/wp-content/uploads/2020/11/Sweet-Potatoes-Salmon-Sheet-Pan.jpg',
        user_id=1
    )

    db.session.add(chicken_and_rice)
    db.session.add(salmon_rice_bowl)
    db.session.commit()

def undo_meals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meals"))

    db.session.commit()
