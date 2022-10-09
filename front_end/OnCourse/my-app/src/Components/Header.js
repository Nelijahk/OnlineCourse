import React , {useState} from 'react';
import logo from "../Images/Logo_light.png";
import foto from "../Images/mob.png";
import "../style.css"
import { FaSearch } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const [curUser, setCurUser] =  useState(JSON.parse(window.localStorage.getItem('curUser')));

    const setLogout = () => {
        setCurUser(null);
    };

    const navigate = useNavigate();

    const handleClick = event => {
        event.preventDefault();
        window.localStorage.clear();
        setLogout()
        navigate("/");
        window.location.reload();
    };

    console.log(curUser)

    return(
        <nav>
            <Link to="/" className="nav-link"><img src={logo} className="icon" alt="Home"></img></Link>
            <div className="dropdown">
                <button className="dropdown_btn">Categories</button>
                <div className="dropdown_content">
                    <a className="n av-link" href="#">Business</a>
                    <a className="nav-link" href="#">Development</a>
                    <a className="nav-link" href="#">Design</a>
                    <a className="nav-link" href="#">IT</a>
                    <a className="nav-link" href="#">Marketing</a>
                </div>
            </div>
            <form>
                <input type="text" placeholder="Search..."></input>
                <button type="submit"><FaSearch></FaSearch></button>
            </form>
            <Link to="/teacher" className="teacher">For teacher</Link>
            <div className="regist">
                {curUser && curUser.user_name !== "admin" &&
                    <div>
                        <button onClick={handleClick} type="submit" className="logout_btn" id="logout_btn">Log out</button>
                        <Link to="/account" className="acc_btn" id="acc_btn">Account</Link>
                    </div>
                }

                {!curUser &&
                    <div>
                        <Link to ="/login" className="log_btn" id="log_btn">Log in</Link>
                        <Link to="/signup" className="sign_btn" id="sign_btn">Sign up</Link>
                    </div>
                }

                {curUser && curUser.user_name === "admin" &&
                    <div>
                        <button onClick={handleClick} type="submit" className="logout_btn" id="logout_btn">Log out</button>
                        <Link to="/requests" className="acc_btn" >Requests</Link>
                        <Link to="/accounts" className="acc_btn" >Accounts</Link>
                    </div>
                }
            </div>
            <div className="mob_dropdown">
                <a className="mob_dropdown_btn"><img src={foto} alt="img"/></a>
                <div className="mob_dropdown_content">

                    {curUser && curUser.user_name !== "admin" &&
                        <div>
                            <button onClick={handleClick} type="submit" className="logout_btn" id="logout_btn">Log out</button>
                            <Link to="/account" className="acc_btn" id="acc_btn">Account</Link>
                        </div>
                    }

                    {!curUser &&
                        <div>
                            <Link to ="/login" className="log_btn" id="log_btn">Log in</Link>
                            <Link to="/signup" className="sign_btn" id="sign_btn">Sign up</Link>
                        </div>
                    }

                    {curUser && curUser.user_name === "admin" &&
                        <div>
                            <button onClick={handleClick} type="submit" className="logout_btn" id="logout_btn">Log out</button>
                            <Link to="/requests" className="acc_btn" >Requests</Link>
                            <Link to="/accounts" className="acc_btn" >Accounts</Link>
                        </div>
                    }

                    <hr />

                    <p>Categories</p>

                    <hr />

                    <a href="#">Business</a>
                    <a href="#">Development</a>
                    <a href="#">Design</a>
                    <a href="#">IT</a>
                    <a href="#">Marketing</a>

                    <hr />

                    <Link to="/teacher" className="teacher">For teacher</Link>

                </div>
            </div>
        </nav>
    )
}

export default Header;
