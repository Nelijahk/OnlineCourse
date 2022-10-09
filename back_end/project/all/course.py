from flask import jsonify, request, Blueprint
from all.models import *
from all.user import auth

course_query = Blueprint('course_query', __name__)

@course_query.route('/course', methods = ['POST'])
# @auth.login_required
def add_course():
        params = request.json
        course = Course(**params)
        user = User.query.filter(User.user_name == course.id_teacher).first()
        if not user:
            return "User with such user_name does not exists", 401
        exists = session.query(Course.id_course).filter_by(name=params['name']).first()
        if exists:
            return 'Course with such name already exists.', 403

        # if user.user_name != auth.username():
        #     return 'Access is denied. You can only create courses in your own name.', 405

        if not user.status == 'Teacher':
            return 'Only teacher can create course', 402
        session.add(course)
        session.commit()
        session.close()
        return 'Successful operation', 200

@course_query.route('/course/<name>', methods = ['PUT'])
# @auth.login_required
def update_course(name):
        course = Course.query.filter(Course.name == name).first()
        if not course:
            return "Course with such name does not exists", 401
        params = request.json
        for key, value in params.items():
            setattr(course, key, value)
        user = User.query.filter(User.id_user == course.id_teacher).first()
        # if user.status == 'Student':
        #     return 'Only teacher can update course', 402
        # if user.user_name != auth.username():
        #     return 'Access is denied. You can update only your courses.', 405
        session.commit()
        session.close()
        return 'Successful operation', 200

@course_query.route('/course/<name>', methods=['DELETE'])
# @auth.login_required
def delete_user(name):
        course = Course.query.filter(Course.name == name).first()
        if not course:
            return "Course with such name does not exists", 401
        user = User.query.filter(User.user_name == course.id_teacher).first()
        # if user.user_name != auth.username():
        #     return 'Access is denied. You can delete only your courses.', 405
        # if not user.status == 'Teacher':
        #     return 'Only teacher can delete course', 402
        session.delete(course)
        session.commit()
        return 'Successful operation', 200

@course_query.route('/courses', methods=['GET'])
def get_all():
    try:
        courses = Course.query.all()
        list = []
        for course in courses:
            list.append({
                'id_course': course.id_course,
                'name': course.name,
                'theme': course.theme,
                'details': course.details,
                'id_teacher': course.id_teacher
            })
        return jsonify(list), 200
    except Exception:
        return 'Unsuccessful operation', 403

@course_query.route('/course/teacher/<name>', methods=['GET'])
def get_teacher(name):
        course = Course.query.filter(Course.name == name).first()
        if not course:
            return "Course with such name does not exists", 401
        user = User.query.filter(User.user_name == course.id_teacher).first()
        if not user:
            return "User with such username does not exists", 402
        user_data = {"id_user": user.id_user, "first_name": user.first_name, "last_name": user.last_name,
                     "user_name": user.user_name, "email": user.email}
        return jsonify(user_data), 200


@course_query.route('/course/<name>', methods=['GET'])
def get_course(name):
        course = Course.query.filter(Course.name == name).first()
        if not course:
            return "Course with such name does not exists", 401

        teacher = User.query.filter(course.id_teacher == User.user_name).first()
        course_data = {"id_course": course.id_course, "name": course.name, "theme": course.theme,
                       "details": course.details, "id_teacher": course.id_teacher}
        return jsonify(course_data), 200