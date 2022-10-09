from all.models import *

user = User(id_user=1, first_name="Amelia", last_name="Wilson",
            user_name="qwerty", password="1232b", email="amelia@gmail.com", status="Teacher")
user2 = User(id_user=2, first_name="Adam", last_name="Johnson",
            user_name="qwe123", password="12qweb", email="adam@gmail.com", status="Student")
user3 = User(id_user=4, first_name="Maria", last_name="Howard",
            user_name="asdfhj", password="9876", email="maria@gmail.com", status="Teacher")

course = Course(id_course=1, name="English", theme="Tenses",
                details="You will learn all tenses", id_teacher=1)
course2 = Course(id_course=2, name="Mathe", theme="fhbsh",
                details="dzthjstkys", id_teacher=3)

userNcourse = User_and_Course(id=1, user_id=1, id_courses=1)
userNcourse2 = User_and_Course(id=2, user_id=2, id_courses=1)
userNcourse3 = User_and_Course(id=3, user_id=2, id_courses=2)

session.add(user)
session.add(user2)
session.add(user3)
session.commit()

session.add(course)
session.add(course2)
session.add(userNcourse)
session.add(userNcourse2)
session.add(userNcourse3)
session.commit()

print(session.query(User).all())
print(session.query(Course).all())
print(session.query(User_and_Course).all())

session.close()