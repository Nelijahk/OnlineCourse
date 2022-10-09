import React, { useEffect, useState } from 'react';
import '../style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const Course = () => {
    const navigate = useNavigate();
    const {name} = useParams();
    console.log(name)

    console.log(localStorage.getItem("curUser"))

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/course/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((j) => {
            setData(j)
            const getcourse = j;
            document.getElementById('name').value = getcourse.name;
            document.getElementById('theme').value = getcourse.theme;
            document.getElementById('details').value = getcourse.details;
            document.getElementById('id_teacher').value = getcourse.id_teacher;
        })
    }, [])


    const handleSubmit = event => {
        event.preventDefault();

        const json = {
            user_id: curUser.user_name,
            id_courses: name,
        }
        console.log(json)

        fetch('http://localhost:5000/userCourse', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw response.status;
            }
            navigate("/mycourses");
            return response.text();
        })
            .catch((err) => {
                if (err === 401) {
                    alert('User with such username already exists');
                }
                if (err === 403) {
                    alert('Course with such name already exists');
                }
                if (err === 400) {
                    alert('Such student is already on this course)');
                }
            });
    }

    const handleDelete = async event =>{
        event.preventDefault();

        fetch(`http://localhost:5000/course/${name}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw response.status;
                }
                navigate("/mycourses");

            })
            .catch((error) => {
                alert(error);
            });
    }

    return(
        <form className="sign">
            <div className="container">
                <h1><span>Course information</span></h1>

                <hr />
                <b>Name</b>
                <input type="text" disabled={true} id="name" className="field" required minLength="3" />

                <b>Theme</b>
                <input type="text" disabled={true} id="theme" className="field" required minLength="3" />

                <b>Details</b>
                <input type="text" disabled={true} id="details" className="field" required minLength="3" />

                <b>Teacher Username</b>
                <input type="text" disabled={true} id="id_teacher" className="field" required minLength="3" />

                <hr />
                {curUser && curUser.user_name === data.id_teacher &&
                    <div>
                        <Link to = {`/course/edit/${data.name}`} className="edit_btn" id="edit_btn">Edit</Link>
                        <button onClick={handleDelete} type="submit" className="del_btn" id="del_btn">Delete</button>
                    </div>
                }
                <Link to ={`/course/teacher/${data.name}`} className="t_btn" id="t_btn">More about teacher</Link>

                {curUser && curUser.user_name !== data.id_teacher &&
                    <button onClick={handleSubmit} type="submit" className="del_btn" id="del_btn">Enroll me</button>
                }
            </div>
        </form>
    )
}

export default Course;
