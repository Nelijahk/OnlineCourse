import React, {useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const Edit = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (curUser === null) {
            navigate("/")
        }
    }, [])

    console.log(localStorage.getItem("curUser"))

    useEffect(() => {
        fetch(`http://localhost:5000/user/${curUser.user_name}`, {
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

    const handleSubmit = event => {
        event.preventDefault()

        const user = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            user_name: document.getElementById('user_name').value,
            email: document.getElementById('email').value
        };

        fetch(`http://localhost:5000/user/${curUser.user_name}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw response.status;
            }
            window.localStorage.clear();
            window.localStorage.setItem('curUser', JSON.stringify(user));
            navigate("/account");
            return response.text();
        })
            .catch((err) => {
                alert(err);
            });
    }

    return(
        <form className="sign">
            <div className="container">
                <h1><span>Edit personal information</span></h1>
                <p><span>Fill field you want to change.</span></p>

                <hr />
                <b>First name</b>
                <input type="text" id="first_name" placeholder="Enter first name" className="field" required minLength="3" />

                <b>Last name</b>
                <input type="text" id="last_name" placeholder="Enter last name" className="field" required minLength="3" />

                <b>Username</b>
                <input type="text" id="user_name" placeholder="Enter Username" className="field" required minLength="3" />

                <b>Email</b>
                <input type="text" id="email" placeholder="Enter Email" className="field" required minLength="3" />

                <hr />

                <button onClick={handleSubmit} type="submit" className="save_btn" id="save_btn">Save changes</button>
                <Link to ="/account" className="back_btn" id="back_btn">Back</Link>
            </div>
        </form>
    )
}

export default Edit
