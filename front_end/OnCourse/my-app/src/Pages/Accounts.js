import React, { useState, useEffect } from 'react'
import '../style.css';
import { Link } from 'react-router-dom';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const Accounts = () => {
    console.log(localStorage.getItem("curUser"))

    const [users, setUsers]= useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setUsers(data.map((user) => user));
            console.log(users);
        })
    }, []);

    return (
        <div className="account">
            <h1><span>All users</span></h1>

            <hr />

            {users.map((user) => (
                <Link to={`/user/${user.user_name}`}><p id="name"> User_name: {user.user_name} </p></Link>
            ))}
        </div>
    )
}

export default Accounts
