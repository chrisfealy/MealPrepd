from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Food
from ..forms import FoodForm

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

@food_routes.route('/current')
@login_required
def get_current_user_foods():
    foods = Food.query.filter(Food.user_id == current_user.id)
    response = [food.to_dict() for food in foods]
    return {'foods': response}

@food_routes.route('/new', methods=['POST'])
@login_required
def create_food():
    form = FoodForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        params = {
            'name': form.data['name'],
            'serving_size': form.data['serving_size'],
            'calories': form.data['calories'],
            'carbs': form.data['carbs'],
            'proteins': form.data['proteins'],
            'fats': form.data['fats'],
            'user_id': current_user.id
        }
        food = Food(**params)
        db.session.add(food)
        db.session.commit()
        return food.to_dict()
    return {'Error': 'Bad Request'}, 400

@food_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_food(id):
    food = Food.query.get(id)

    if not food:
        return {'message':"Food couldn't be found"}, 404

    if current_user.id != food.user_id:
        return {'message':'Forbidden'}, 401

    db.session.delete(food)
    db.session.commit()
    return {'message':'Successfully deleted'}, 200
