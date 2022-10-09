import React, { useState, useEffect } from 'react'
import '../style.css';
import { Link } from 'react-router-dom';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const Requests = () => {
    console.log(localStorage.getItem("curUser"))

    const [users, setUsers]= useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/users/requests`, {
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

    console.log(users);

    return (
        <div className="account">
            <h1><span>All requests</span></h1>

            <hr />

            {users.map((user) => (
                <Link to={`/request/${user.user_name}`}><p id="name"> User_name: {user.user_name} </p></Link>
            ))}
            {users.length === 0 &&
                <p>No requests</p>
            }
        </div>
    )
}

export default Requests
