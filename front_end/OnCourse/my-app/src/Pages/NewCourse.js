import React, {useEffect, useState} from 'react';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const NewCourse = () => {
    const [curuser, setuser] = useState(JSON.parse(window.localStorage.getItem('curUser')));
    console.log(curuser.user_name)

    const navigate = useNavigate();

    useEffect(() => {
        if (curUser === null){
            navigate("/")
        }
    },[])

    const [name, setName] = useState();
    const [theme, setTheme] = useState();
    const [details, setDetails] = useState();
    const [username, setUsername] = useState();

    const course = {
        name: name,
        theme: theme,
        details: details,
        id_teacher: curuser.user_name
    };

    const handleSubmit = event => {
        event.preventDefault();

        fetch('http://localhost:5000/course', {
            method: 'POST',
            body: JSON.stringify(course),
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
                    alert('User with such username does not exists ');
                }
                if (err === 402) {
                    alert('Incorrect status(Only teacher can create course)');
                }

                if (err === 403) {
                    alert('Course with such name is already exists.')
                }
            });

    }

    return(
        <form className="sign">
            <div className="container">
                <h1><span>Create course</span></h1>
                <p><span>Please fill in this form to create a course.</span></p>

                <hr />
                <b>Name</b>
                <input type="text" onChange={event => setName(event.target.value)} name="name" placeholder="Enter course name" className="field" required minLength="3" />

                <b>Theme</b>
                <input type="text" onChange={event => setTheme(event.target.value)} name="theme" placeholder="Enter course theme" className="field" required minLength="3" />

                <b>Details</b>
                <input type="text" onChange={event => setDetails(event.target.value)} name="details" placeholder="Enter details" className="field" required minLength="3" />

                <hr />

                <button onClick={handleSubmit} type="submit" className="registerbtn">Create</button>
            </div>
        </form>
    )
}

export default NewCourse;
