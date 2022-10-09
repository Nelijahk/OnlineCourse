from flask import Flask
from flask_cors import CORS

from all.user import user_query
from all.course import course_query
from all.user_and_course import user_and_course_query

# from flask_bcrypt import Bcrypt
# from flask_marshmallow import Marshmallow
# import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_query)
app.register_blueprint(course_query)
app.register_blueprint(user_and_course_query)

if __name__ == '__main__':
    app.run(debug=True)
