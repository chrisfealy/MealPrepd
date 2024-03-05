from .db import db, environment, SCHEMA, add_prefix_for_prod

entry_foods = db.Table(
    'entry_foods',
    db.Column('entry_id', db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id'))),
    db.Column('food_id', db.Integer, db.ForeignKey(add_prefix_for_prod('foods.id')))
)

if environment == "production":
    entry_foods.schema = SCHEMA
