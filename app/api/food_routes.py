from flask import Blueprint
from flask_login import current_user, login_required
from ..models import db, Food

food_routes = Blueprint('foods', __name__)

@food_routes.route('/')
def get_foods():
    foods = Food.query.all()
    response = [food.to_dict() for food in foods]
    return {'foods': response}

@food_routes.route('/<int:id>')
def get_food(id):
    food = Food.query.get(id)
    return food.to_dict()
