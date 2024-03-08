from app.models import db, Meal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_meals():
    chicken_and_rice = Meal(
        name='Chicken and Rice',
        image_url='https://media.blueapron.com/recipes/21573/square_newsletter_images/1551808633-426-0022-9358/0408_FPP_Chicken-Terriyaki_037_Square.jpg?quality=80&width=850&format=pjpg',
        user_id=2
    )

    salmon_sweet_potatoes = Meal(
        name='Salmon and Sweet Potatoes',
        image_url='https://www.theproducemoms.com/wp-content/uploads/2020/11/Sweet-Potatoes-Salmon-Sheet-Pan.jpg',
        user_id=2
    )

    protein_shake = Meal(
        name='Chocolate PB Protein Shake',
        image_url='https://cdn.muscleandstrength.com/sites/default/files/field/feature-image/recipe/peanut-butter-banana-shake.jpg',
        user_id=2
    )

    avocado_toast = Meal(
        name='Avocado Toast',
        image_url='https://www.skinnytaste.com/wp-content/uploads/2015/01/Avocado-Toast-with-Egg-7-500x500.jpg',
        user_id=2
    )

    db.session.add(chicken_and_rice)
    db.session.add(salmon_sweet_potatoes)
    db.session.add(protein_shake)
    db.session.add(avocado_toast)
    db.session.commit()

def undo_meals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meals"))

    db.session.commit()
