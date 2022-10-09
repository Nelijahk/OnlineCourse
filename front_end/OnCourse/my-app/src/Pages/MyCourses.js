import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const MyCourses = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (curUser === null){
            navigate("/")
        }
    },[])

    console.log(localStorage.getItem("curUser"))

    const [courses, setCourses]= useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/user/courses/${curUser.user_name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setCourses(data.map((course) => course));
            // courses = data.map((course) => course);
            console.log(courses);
        })
    }, []);

    return(
        <div className="account">
            <h1><span>My Courses</span></h1>

            <hr />

            {courses.map((course) => (
                <Link to={`/course/${course.name}`}><p id="name"> Name: {course.name} </p></Link>
            ))}
            <div className="butt">
                {curUser &&
                    <Link to ="/newcourse" className="edit_btn" id="edit_btn">Create Course</Link>
                }
            </div>
        </div>
    )
}

export default MyCourses;
