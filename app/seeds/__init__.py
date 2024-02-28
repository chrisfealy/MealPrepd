from flask.cli import AppGroup
from .users import seed_users, undo_users
from .foods import seed_foods, undo_foods
from .meals import seed_meals, undo_meals
from .meal_foods import seed_meal_foods, undo_meal_foods

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_meal_foods()
        undo_meals()
        undo_foods()
        undo_users()
    seed_users()
    seed_foods()
    seed_meals()
    seed_meal_foods()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_meal_foods()
    undo_meals()
    undo_foods()
    undo_users()
