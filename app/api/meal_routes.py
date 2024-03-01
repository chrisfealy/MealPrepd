from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Meal
from ..forms import MealForm
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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

        image = form.data['image']
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

        params = {
            'name': form.data['name'],
            'description': form.data['description'],
            'image_url': upload['url'] if image else None,
            'user_id': current_user.id
        }

        meal = Meal(**params)
        db.session.add(meal)
        db.session.commit()
        return meal.to_dict(), 201

    return {'Error': 'Bad Request'}, 400


@meal_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_meal(id):
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

        image = form.data['image']
        if image:
            remove_file_from_s3(meal['image_url'])
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            meal.image_url = upload['url']

        db.session.commit()
        return meal.to_dict()

    return {'Error': 'Bad Request'}, 400

@meal_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_meal(id):
    meal = Meal.query.get(id)

    if not meal:
        return {'message':"Meal couldn't be found"}, 404

    if current_user.id != meal.user_id:
        return {'message':'Forbidden'}, 401

    if meal['image_url']:
        remove_file_from_s3(meal['image_url'])

    db.session.delete(meal)
    db.session.commit()
    return {'message':'Successfully deleted'}, 200
