from flask import jsonify, request, Blueprint
from all.models import *
from all.user import auth

user_and_course_query = Blueprint('user_and_course_query', __name__)

@user_and_course_query.route('/course/students/<name>', methods=['GET'])
def get_students(name):
        c = Course.query.filter(Course.name == name).first()
        if not c:
            return "Course with such ID does not exists", 401
        courses = User_and_Course.query.all()
        list = []
        for course in courses:
            user = User.query.filter(User.user_name == course.user_id).first()
            if course.id_courses == name:
                list.append({
                    'id_user': user.id_user,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'user_name': user.user_name,
                    'email': user.email
                })
        return jsonify(list), 200


@user_and_course_query.route('/user/courses/<user_name>', methods=['GET'])
# @auth.login_required
def get_courses(user_name):
        u = User.query.filter(User.user_name == user_name).first()
        if not u:
            return "User with such user_name does not exists", 401
        # if u.user_name != auth.username():
        #     return 'Access is denied', 405
        users = User_and_Course.query.all()
        list = []
        for user in users:
            course = Course.query.filter(Course.name == user.id_courses).first()
            if user.user_id == u.user_name:
                list.append({
                    'id_course': course.id_course,
                    'name': course.name,
                    'theme': course.theme,
                    'details': course.details,
                    'id_teacher': course.id_teacher
                })

        courses = Course.query.all()
        for course in courses:
            if course.id_teacher == user_name:
                list.append({
                    'id_course': course.id_course,
                    'name': course.name,
                    'theme': course.theme,
                    'details': course.details,
                    'id_teacher': course.id_teacher
                })


        return jsonify(list), 200


@user_and_course_query.route('/userCourse', methods=['POST'])
# @auth.login_required
def add_user_course():
        params = request.json
        user_course = User_and_Course(**params)
        user = User.query.filter(User.user_name == user_course.user_id).first()
        if not user:
            return "User with such ID does not exists", 401
        # if not user.status == 'Student':
        #     return "You can add only student"
        course = Course.query.filter(Course.name == user_course.id_courses).first()
        if not course:
            return "Course with such ID does not exists", 403
        teacher = User.query.filter(User.id_user == course.id_teacher).first()
        # if teacher.user_name != auth.username():
        #     return 'Access is denied', 405
        qwerty = RequestForCourse.query.all()
        for qw in qwerty:
            if qw.id_course == course.id_course and qw.id_user == user.id_user:
                session.delete(qw)
                session.commit()
        tmps = User_and_Course.query.all()
        k = 0
        for tmp in tmps:
            if tmp.id_courses == course.name and tmp.user_id == user.user_name:
                return "Such student is already on this course", 400
            if tmp.id_courses == course.id_course:
                k += 1
        if k >= 5:
            return "There are already 5 students on this course", 402
        session.add(user_course)
        session.commit()
        session.close()
        return 'Successful operation', 200

@user_and_course_query.route('/userCourse/<int:id_user>/<int:id_course>', methods=['DELETE'])
@auth.login_required
def delete_user_course(id_user, id_course):
        user = User.query.filter(User.id_user == id_user).first()
        if not user:
            return "User with such ID does not exists", 401
        course = Course.query.filter(Course.id_course == id_course).first()
        if not course:
            return "Course with such ID does not exists", 401
        teacher = User.query.filter(User.id_user == course.id_teacher).first()
        if teacher.user_name != auth.username():
            return 'Access is denied', 405
        tmps = User_and_Course.query.all()
        for tmp in tmps:
            if tmp.id_courses == course.id_course and tmp.user_id == user.id_user:
                session.delete(tmp)
                session.commit()
                return 'Successful operation', 200
        # for tmp in tmps:
        #     if not (tmp.id_courses == course.id_course and tmp.user_id == user.id_user):
        #         return 'Such user not on this course', 400


@user_and_course_query.route('/request', methods=['POST'])
def add_request():
        params = request.json
        request_ = RequestForCourse(**params)
        user = User.query.filter(User.id_user == request_.id_user).first()
        if not user:
            return "User with such ID does not exists", 401
        # if not user.status == 'Student':
        #     return "You can add only student"
        course = Course.query.filter(Course.id_course == request_.id_course).first()
        if not course:
            return "Course with such ID does not exists", 401
        if user.user_name != auth.username():
            return 'Access is denied', 405
        session.add(request_)
        session.commit()
        session.close()
        return 'Successful operation', 200
