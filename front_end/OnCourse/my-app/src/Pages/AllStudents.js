import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const AllStudents = () => {
    const navigate = useNavigate();
    const {name} = useParams();

    useEffect(() => {
        if (curUser === null){
            navigate("/")
        }
    },[])

    console.log(localStorage.getItem("curUser"))

    const [users, setUsers]= useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/course/students/${name}`, {
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

    return(
        <div className="account">
            <h1><span>All Students</span></h1>

            <hr />

            {users.map((user) => (
                <Link to={`/user/${user.user_name}`}><p id="name"> User_name: {user.user_name} </p></Link>
            ))}

        </div>
    )
}

export default AllStudents;
