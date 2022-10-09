from unittest.mock import patch

from unittest import TestCase
from base64 import b64encode

import json
import all.user

from all.models import *
from all.app import app


class Tests(TestCase):
    tester = app.test_client()
    st1 = b64encode(b"st1:123").decode("utf-8")
    st18 = b64encode(b"st7:123").decode("utf-8")
    st = b64encode(b"st3:123").decode("utf-8")
    teacher = b64encode(b"teacher1:123").decode("utf-8")

    def setUp(self):
        self.st1 = {
            "first_name": "Adam",
            "last_name": "Johnson",
            "user_name": "st1",
            "password": "123",
            "email": "Adam@gmail.com",
            "status": "Student"
        }

        self.st2 = {
            "first_name": "Ruby",
            "last_name": "Osborne",
            "user_name": "st2",
            "password": "123",
            "email": "Ruby@gmail.com",
            "status": "Student"
        }

        self.wrong_status = {
            "first_name": "Ruby",
            "last_name": "Osborne",
            "user_name": "new",
            "password": "123",
            "email": "Ruby@gmail.com",
            "status": "asdfgerfth"
        }

        self.teacher1 = {
            "first_name": "Amelia",
            "last_name": "Wilson",
            "user_name": "teacher1",
            "password": "123",
            "email": "Amelia@gmail.com",
            "status": "Teacher"
        }

        self.course = {
            "name": "new_course",
            "theme": "new",
            "details": "new",
            "id_teacher": 1
        }

        self.user_course = {
            "user_id": 5,
            "id_courses": 2
        }

        self.wrong_id_user_user_course = {
            "user_id": 51234567,
            "id_courses": 2
        }

        self.wrong_id_course_user_course = {
            "user_id": 5,
            "id_courses": 21234567
        }

        self.exists_user_course = {
            "user_id": 3,
            "id_courses": 2
        }

        self.for_five = {
            "user_id": 2,
            "id_courses": 1
        }

        self.request = {
            "id_user": 18,
            "id_course": 2
        }

        self.wrong_id_course_request = {
            "id_user": 18,
            "id_course": 123456
        }

        self.wrong_id_user_request = {
            "id_user": 12345678,
            "id_course": 2
        }

        self.user_put = {
            "first_name": "New"
        }

        self.user_put_status = {
            "status": "Teacher"
        }

        self.course_put = {
            "name": "New"
        }

    # Test auth

@patch("models.session")
class TestAuth(Tests):
    def test_st1_auth(self, session):
        identity = all.user.verify_password(self.st1["user_name"], self.st1["password"])
        self.assertEqual(identity, self.st1["user_name"])

    def invalid_test_st1_auth(self, session):
        identity = all.user.verify_password(self.st1["user_name"], 'invalid')
        self.assertIsNone(identity, None)

    def test_teacher1_auth(self, session):
        identity = all.user.verify_password(self.teacher1["user_name"], self.teacher1["password"])
        self.assertEqual(identity, self.teacher1["user_name"])

    def invalid_test_teacher1_auth(self, session):
        identity = all.user.verify_password(self.teacher1["user_name"], 'invalid')
        self.assertIsNone(identity, None)


@patch("models.session")
class TestUser(Tests):

    # Test user post

    def test_post_st(self, session):
        response = self.tester.post("/user", data=json.dumps(self.st2), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(session().query(User).filter_by(user_name=self.st2["user_name"]).one())

    def again_test_post_st(self, session):
        response = self.tester.post("/user", data=json.dumps(self.st1), content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def wrong_status_test_post_st(self, session):
        response = self.tester.post("/user", data=json.dumps(self.wrong_status), content_type="application/json")
        self.assertEqual(response.status_code, 402)

    # Test user put

    def test_user_put(self, session):
        response = self.tester.put('/user/18', data=json.dumps(self.user_put),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 200)

    def wrong_id_test_user_put(self, session):
        response = self.tester.put('/user/1234', data=json.dumps(self.user_put),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 401)

    def wrong_auth_test_user_put(self, session):
        response = self.tester.put('/user/18', data=json.dumps(self.user_put),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 405)

    def wrong_status_test_user_put(self, session):
        response = self.tester.put('/user/18', data=json.dumps(self.user_put_status),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 402)

    # Test user delete
    def test_user_delete(self, session):
        response = self.tester.delete('/user/56', headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 200)

    def test_user_delete_invalidID(self, Session):
        response = self.tester.delete('/user/100', headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 401)

@patch("models.session")
class TestCourse(Tests):

    # Test course post

    def test_course_post(self, session):
        response = self.tester.post('/course',
                                    data=json.dumps(self.course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 200)

    def wrong_test_course_post(self, session):
        response = self.tester.post('/course',
                                    data=json.dumps(self.course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 405)

    # Test course put
    def test_course_put(self, session):
        response = self.tester.put('/course/9', data=json.dumps(self.course_put),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 200)

    def wrong_id_test_course_put(self, session):
        response = self.tester.put('/course/1234', data=json.dumps(self.course_put),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 401)

    def wrong_auth_test_course_put(self, session):
        response = self.tester.put('/course/9', data=json.dumps(self.course_put),
                                   content_type="application/json",
                                   headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 405)

    # Test course get

    def test_course_get(self, Session):
        response = self.tester.get("/course/1")
        self.assertEqual(response.json, {
            "details": "new",
            "id_course": 1,
            "id_teacher": 1,
            "name": "Mathe",
            "theme": "Algebra"
        })

    # def wrong_id_test_course_get(self, Session):
    #     response = self.tester.get("/course/1234")
    #     self.assertEqual(response.status_code, 401)

    def test_course_teacher_get(self, Session):
        response = self.tester.get("/course/teacher/1")
        self.assertEqual(response.json, {
            "email": "Amelia@gmail.com",
            "first_name": "Amelia",
            "id_user": 1,
            "last_name": "Wilson",
            "user_name": "teacher1"
        })

    # def wrong_id_test_course_teacher_get(self, Session):
    #     response = self.tester.get("/course/1234")
    #     self.assertEqual(response.status_code, 401)

    # Test course delete

    def test_course_delete(self, session):
        response = self.tester.delete('/course/49', headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 200)

    def test_course_delete_invalidID(self, Session):
        response = self.tester.delete('/course/100', headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 401)

    def wrong_test_course_delete(self, session):
        response = self.tester.delete('/course/3', headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 405)

@patch("models.session")
class TestsUserCourse(Tests):

    # Test user&course post

    def test_userCourse_post(self, session):
        response = self.tester.post('/userCourse',
                                    data=json.dumps(self.user_course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 200)

    def again_test_userCourse_post(self, session):
        response = self.tester.post('/userCourse',
                                    data=json.dumps(self.exists_user_course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 400)

    def wrong_test_userCourse_post(self, session):
        response = self.tester.post('/userCourse',
                                    data=json.dumps(self.user_course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 405)

    def wrong_id_course_test_userCourse_post(self, session):
        response = self.tester.post('/userCourse',
                                    data=json.dumps(self.wrong_id_course_user_course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 401)

    def wrong_id_user_test_userCourse_post(self, session):
        response = self.tester.post('/userCourse',
                                    data=json.dumps(self.wrong_id_user_user_course),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 401)

    def for_five_test_userCourse_post(self, session):
        response = self.tester.post('/userCourse',
                                    data=json.dumps(self.for_five),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 402)

    # Test user&course get

    def wrong_id_course_test_userCourse_get_st(self, Session):
        response = self.tester.get("/course/students/10000")
        self.assertEqual(response.status_code, 401)

    def test_userCourse_get_st(self, Session):
        response = self.tester.get("/course/students/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json,
                         [
                             {
                                 "email": "Dominic@gmail.com",
                                 "first_name": "Dominic",
                                 "id_user": 3,
                                 "last_name": "Toretto",
                                 "user_name": "st3"
                             },
                             {
                                 "email": "Kristin@gmail.com",
                                 "first_name": "Kristin",
                                 "id_user": 4,
                                 "last_name": "Bates",
                                 "user_name": "st4"
                             },
                             {
                                 "email": "Oliver@gmail.com",
                                 "first_name": "Oliver",
                                 "id_user": 5,
                                 "last_name": "Quene",
                                 "user_name": "st5"
                             },
                             {
                                 "email": "Kellie@gmail.com",
                                 "first_name": "Kellie",
                                 "id_user": 6,
                                 "last_name": "Barnett",
                                 "user_name": "st6"
                             },
                             {
                                 "email": "Rosemary@gmail.com",
                                 "first_name": "New",
                                 "id_user": 18,
                                 "last_name": "Chapman",
                                 "user_name": "st7"
                             }
                         ])

    def wrong_id_user_test_userCourse_get_course(self, Session):
        response = self.tester.get('/user/courses/3000000', headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 401)

    def test_userCourse_get_course(self, Session):
        response = self.tester.get('/user/courses/3', headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json,
                         [
                             {
                                 "details": "new",
                                 "id_course": 1,
                                 "id_teacher": 1,
                                 "name": "Mathe",
                                 "theme": "Algebra"
                             },
                             {
                                 "details": "new",
                                 "id_course": 2,
                                 "id_teacher": 1,
                                 "name": "Mathe",
                                 "theme": "Geometry"
                             }
                         ])

    # Test user&course delete
    def test_userCourse_delete(self, session):
        response = self.tester.delete('/userCourse/5/2', headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 200)

    def test_userCourse_delete_invalidID_course(self, Session):
        response = self.tester.delete('/userCourse/5/200', headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 401)

    def test_userCourse_delete_invalidID_user(self, Session):
        response = self.tester.delete('/userCourse/500/2', headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 401)

    def wrong_test_userCourse_delete(self, session):
        response = self.tester.delete('/userCourse/5/2', headers={"Authorization": f"Basic {self.st}"})
        self.assertEqual(response.status_code, 405)

    def not_exists_test_userCourse_delete(self, session):
        response = self.tester.delete('/userCourse/4/2', headers={"Authorization": f"Basic {self.teacher}"})
        self.assertEqual(response.status_code, 400)

    # Test request post

    def test_request_post(self, session):
        response = self.tester.post('/request',
                                    data=json.dumps(self.request),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 200)

    def wrong_id_user_test_request_post(self, session):
        response = self.tester.post('/request',
                                    data=json.dumps(self.wrong_id_user_request),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 401)

    def wrong_id_course_test_request_post(self, session):
        response = self.tester.post('/request',
                                    data=json.dumps(self.wrong_id_course_request),
                                    content_type="application/json",
                                    headers={"Authorization": f"Basic {self.st18}"})
        self.assertEqual(response.status_code, 401)


