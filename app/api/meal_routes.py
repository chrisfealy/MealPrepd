from flask import Blueprint
from flask_login import current_user, login_required
from ..models import db, Meal

meal_routes = Blueprint('meals', __name__)

@meal_routes.route('/')
def get_meals():
    meals = Meal.query.all()
    response = [meal.to_dict() for meal in meals]
    return {'meals': response}

@meal_routes.route('/<int:id>')
def get_meal(id):
    meal = Meal.query.get(id)
    return meal.to_dict()

@meal_routes.route('/current')
@login_required
def get_current_user_meals():
    meals = Meal.query.filter(Meal.user_id == current_user.id)
    response = [meal.to_dict() for meal in meals]
    return {'meals': response}

@meal_routes.route('/new', methods=['POST'])
@login_required
def create_meal():
    pass
