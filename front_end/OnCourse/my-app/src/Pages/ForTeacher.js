import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../style.css';
import { Checkbox, FormControlLabel } from '@mui/material';

const curUser = JSON.parse(window.localStorage.getItem('curUser'));

const ForTeacher = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (curUser !== null){
            navigate("/")
        }
    },[])

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    console.log(checked)

    return(
        <div className="account">
            <div className="contaiter">
                <h1><span>For teacher</span></h1>

                <hr />

                <h2><span>Terms&Policy</span></h2>

                <i>To become our teacher you need to send request. For that you must read our Terms&Policy and
                    than fill out the form. We will activate you account in a few days.</i>
                <p>Attention!!! It is very important information.</p>

                <hr />

                <div className="butt">
                    <FormControlLabel control={  <Checkbox
                        onChange={handleChange}
                        checked={checked}
                        />} label="Accept" />

                    {checked &&
                        <Link to ="/registteacher" className="edit_btn" id="edit_btn">Request form</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default ForTeacher;
