import React, {useEffect} from "react";
import { Link, useNavigate, useParams} from 'react-router-dom';
import '../style.css';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const Edit = () => {
    const {user_name} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (curUser === null) {
            navigate("/")
        }
    }, [])

    console.log(localStorage.getItem("curUser"))

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

    const handleSubmit = event => {
        event.preventDefault()

        const user = {
            activate: "Yes"
        };

        fetch(`http://localhost:5000/user/${user_name}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw response.status;
            }
            navigate("/requests");
            window.location.reload()
            return response.text();
        })
            .catch((err) => {
                alert(err);
            });
    }

    const handleDelete = async event =>{
        event.preventDefault();

        fetch(`http://localhost:5000/user/${user_name}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw response.status;
                }
                navigate("/requests");
                window.location.reload()
            })
            .catch((error) => {
                alert(error);
            });
    }

    return(
        <form className="sign">
            <div className="container">
                <h1><span>Request information</span></h1>
                <p><span>Fill field you want to change.</span></p>

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

                <button onClick={handleSubmit} type="submit" className="save_btn" id="save_btn">Accept request</button>
                <button onClick={handleDelete} type="submit" className="del_btn" id="del_btn">Delete</button>
                <Link to ="/account" className="back_btn" id="back_btn">Back</Link>
            </div>
        </form>
    )
}

export default Edit
