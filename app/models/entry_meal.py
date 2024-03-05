from .db import db, environment, SCHEMA, add_prefix_for_prod

entry_meals = db.Table(
    'entry_meals',
    db.Column('entry_id', db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id'))),
    db.Column('meal_id', db.Integer, db.ForeignKey(add_prefix_for_prod('meals.id')))
)

if environment == "production":
    entry_meals.schema = SCHEMA
