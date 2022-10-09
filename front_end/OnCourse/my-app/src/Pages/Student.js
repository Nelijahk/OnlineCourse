import React, { useEffect } from "react";
import '../style.css';
import { Link, useParams } from 'react-router-dom';

const Student = () => {
    const {user_name} = useParams();

    console.log(localStorage.getItem("curUser"))

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user_name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            const getuser = data;
            document.getElementById('first_name').value = getuser.first_name;
            document.getElementById('last_name').value = getuser.last_name;
            document.getElementById('user_name').value = getuser.user_name;
            document.getElementById('email').value = getuser.email;
            document.getElementById('status').value = getuser.status;
        })
    }, [])

    return (
        <form className="sign">
            <div className="container">
                <h1><span>User Information</span></h1>

                <hr />
                <b>First name</b>
                <input type="text" disabled={true} id="first_name" placeholder="Enter first name" className="field" required minLength="3" />

                <b>Last name</b>
                <input type="text" disabled={true} id="last_name" placeholder="Enter last name" className="field" required minLength="3" />

                <b>Username</b>
                <input type="text" disabled={true} id="user_name" placeholder="Enter Username" className="field" required minLength="3" />

                <b>Email</b>
                <input type="text" disabled={true} id="email" placeholder="Enter Email" className="field" required minLength="3" />

                <hr />

                <Link to ="../" className="back_btn" id="back_btn">Back</Link>
            </div>
        </form>
    )
}

export default Student;
