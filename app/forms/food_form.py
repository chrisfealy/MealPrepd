from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class FoodForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    serving_size = IntegerField('Serving Size(g)', validators=[DataRequired()])
    calories = IntegerField('Calories (g)', validators=[DataRequired()])
    carbs = IntegerField('Carbohydrates (g)', validators=[DataRequired()])
    proteins = IntegerField('Proteins (g)', validators=[DataRequired()])
    fats = IntegerField('Fats (g)', validators=[DataRequired()])
    submit = SubmitField('Submit Food')
