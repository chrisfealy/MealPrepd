from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Meal
from ..forms import MealForm

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
    form = MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        params = {
            'name': form.data['name'],
            'description': form.data['description'],
            'image_url': form.data['image_url']
        }
        meal = Meal(**params)
        db.session.add(meal)
        db.session.commit()
        return meal.to_dict()
    return {'Error': 'Bad Request'}, 400

@meal_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_food(id):
    meal = Meal.query.get(id)
    form = MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not meal:
        return {'message':"Meal couldn't be found"}, 404

    if current_user.id != meal.user_id:
        return {'message':'Forbidden'}, 401

    if form.validate_on_submit():
        meal.name = form.data['name']
        meal.description = form.data['description']
        db.session.commit()
        return meal.to_dict()
    return {'Error': 'Bad Request'}, 400
