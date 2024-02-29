from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class MealForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    image = FileField('image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('submit')
