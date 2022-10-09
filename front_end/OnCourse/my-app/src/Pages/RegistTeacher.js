import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../style.css';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const RegistTeacher = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (curUser !== null){
            navigate("/")
        }
    },[])

    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const user = {
        first_name: firstname,
        last_name: lastname,
        user_name: username,
        email: email,
        password: password,
        "status": "Teacher",
        "activate": "No",
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (password !== password2) {
            alert("Passwords do not match");
            return
        }

        fetch('http://localhost:5000/user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw response.status;
            }
            alert('Thank you for your request. We activate your account in a few days');
            navigate("/");
            return response.text();
        })
            .catch((err) => {
                if (err === 401) {
                    alert('User with such username already exists');
                }
                if (err === 402) {
                    alert('Incorrect status(it could be only "Teacher" or "Student")');
                }
            });

    }
    return (
        <form className="sign" onSubmit={handleSubmit}>
            <div className="container">
                <h1><span>Sign up</span></h1>
                <p><span>Please fill in this form to create an account.</span></p>

                <hr />
                <b>First name</b>
                <input type="text" onChange={event => setFirstName(event.target.value)} name="first_name" placeholder="Enter first name" className="field" required minLength="3" />

                <b>Last name</b>
                <input type="text" onChange={event => setLastName(event.target.value)} name="last_name" placeholder="Enter last name" className="field" required minLength="3" />

                <b>Username</b>
                <input type="text" onChange={event => setUserName(event.target.value)} name="user_name" placeholder="Enter Username" className="field" required minLength="3" />

                <b>Email</b>
                <input type="text" onChange={event => setEmail(event.target.value)} name="email" placeholder="Enter Email" className="field" required minLength="3" />

                <b>Password</b>
                <input type="password" onChange={event => setPassword(event.target.value)} name="psw" placeholder="Enter Password" className="field" required minLength="3" />

                <b>Confirm password</b>
                <input type="password" onChange={event => setPassword2(event.target.value)} name="conf_psw" placeholder="Enter Password" className="field" required minLength="3" />

                <hr />
                <div className="acc">
                    <p><span>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</span></p>
                </div>

                <button type="submit" className="registerbtn">Send request</button>
            </div>
        </form>
    );
};

export default RegistTeacher;
