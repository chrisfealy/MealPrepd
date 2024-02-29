from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class MealForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    image_url = StringField('image_url')
    submit = SubmitField('submit')
