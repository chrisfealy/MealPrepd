from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class FoodForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    serving_size = IntegerField('serving_size', validators=[DataRequired()])
    calories = IntegerField('calories', validators=[DataRequired()])
    carbs = IntegerField('carbs', validators=[DataRequired()])
    proteins = IntegerField('proteins', validators=[DataRequired()])
    fats = IntegerField('fats', validators=[DataRequired()])
    submit = SubmitField('submit')
