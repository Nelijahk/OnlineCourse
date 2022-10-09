import React, {useEffect} from 'react'
import { useState } from "react";
import '../style.css';
import { Link, useNavigate } from "react-router-dom";

const curUser = localStorage.getItem("curUser")

const Log_in = () => {

    useEffect(() => {
        if (curUser !== null){
            navigate("/")
        }
    },[])

    console.log(localStorage.getItem("curUser"))

    const navigate = useNavigate();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const user = {
        user_name: username,
        password: password,
    };

    const handleSubmit = async event => {
        event.preventDefault();

        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw response.status;
            }
            window.localStorage.setItem('curUser', JSON.stringify(user));
            navigate("/");
            window.location.reload()
            return response.text();
        })
            .catch((err) => {
                if (err === 401) {
                    alert('Wrong user_name or password!');
                    window.location.reload();
                }
                if (err === 402) {
                    alert('Sorry, but your account is not activate');
                    window.location.reload();
                }
            });
    }

    return(
        <div>
            <form className="sign" onSubmit={handleSubmit}>
                <h1><span>Log in</span></h1>
                <p><span>Please fill in this form to log in.</span></p>

                <hr />

                <b>Username</b>
                <input type="text" onChange={event => setUserName(event.target.value)} placeholder="Enter Username" name="user_name" required
                       minLength="3" />

                <b>Password</b>
                <input type="password" onChange={event=> setPassword(event.target.value)} placeholder="Enter Password" name="password" required
                       minLength="3" />

                <hr />

                <button type="submit" className="registerbtn">Log in</button>

                <div className="login">
                    <p>Does not have an account?<Link to="/signup">Sign up</Link>.</p>
                </div>
            </form>
        </div>

    )
}

export default Log_in
