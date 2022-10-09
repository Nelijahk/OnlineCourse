from flask import g
from flask import request, Blueprint, jsonify, Response
from flask_httpauth import HTTPBasicAuth
import json

from all.models import *
from werkzeug.security import check_password_hash

user_query = Blueprint('user_query', __name__)
auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(user_name, password):
    user = User.query.filter(User.user_name == user_name).first()
    if user and check_password_hash(user.password, password):
        return user
    return None

class Login():
    def __init__(self, user_name, password):
        self.user_name = user_name
        self.password = password

@user_query.route('/user/login', methods=['POST'])
def login():
    params = request.get_json(force=True)
    users = User.query.all()
    b = False
    for user in users:
        if user.user_name == params['user_name'] and check_password_hash(user.password, params['password']):
            b = True

    if b:
        user = User.query.filter(User.user_name == params['user_name']).first()
        if user.activate == "No":
            return Response(status=402, response='Please wait. Your account is not activate')
        else:
            return Response(status=200, response='Successful operation')
    else:
        return Response(status=401, response='Unsuccessful operation')


@user_query.route('/user', methods = ['POST'])
def add_user():
    params = request.json
    user = User(**params)
    exists = session.query(User.id_user).filter_by(user_name=params['user_name']).first()
    if exists:
        return 'User with such username already exists.', 401
    if not (params['status'] == 'Teacher' or params['status']  == 'Student'):
        return 'Incorrect status', 402
    session.add(user)
    session.commit()
    return 'Successful operation', 200

@user_query.route('/user/<user_name>', methods = ['PUT'])
# @auth.login_required
def update_user(user_name):
    user = User.query.filter(User.user_name == user_name).first()
    # if user.user_name != auth.username():
    #     return 'Access is denied', 405
    # if not user:
    #     return "User with such user_name does not exists", 401
    params = request.json
    if 'password' in params:
        params['password'] = generate_password_hash(params['password'])
    for key, value in params.items():
        setattr(user, key, value)
    if 'status' in params:
        return 'You can not change your status', 402
    session.commit()
    session.close()
    return 'Successful operation', 200

@user_query.route('/user/<user_name>', methods=['DELETE'])
# @auth.login_required()
def delete_user(user_name):
    user = User.query.filter(User.user_name == user_name).first()
    if not user:
        return "User with such user_name does not exists", 401
    session.delete(user)
    session.commit()
    return 'Successful operation', 200

@user_query.route('/user/<user_name>', methods=['GET'])
def get_course(user_name):
        user = User.query.filter(User.user_name == user_name).first()
        if not user:
            return "User with such user_name does not exists", 401
        user_data = {"first_name": user.first_name, "last_name": user.last_name,
                       "user_name": user.user_name, "email": user.email, "status": user.status}

        return jsonify(user_data), 200

@user_query.route('/users', methods=['GET'])
def get_all_true():
    try:
        users = User.query.all()
        list = []
        for user in users:
            if user.activate == "Yes":
                list.append({
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "user_name": user.user_name,
                    "email": user.email,
                    "status": user.status,
                    "activate": user.activate
                })
        return jsonify(list), 200
    except Exception:
        return 'Unsuccessful operation', 403

@user_query.route('/users/requests', methods=['GET'])
def get_all_false():
    try:
        users = User.query.all()
        list = []
        for user in users:
            if user.activate == "No":
                list.append({
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "user_name": user.user_name,
                    "email": user.email,
                    "status": user.status,
                    "activate": user.activate
                })
        return jsonify(list), 200
    except Exception:
        return 'Unsuccessful operation', 403