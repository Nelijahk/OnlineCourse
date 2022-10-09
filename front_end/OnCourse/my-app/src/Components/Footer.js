import React from 'react';
import logo from "../Images/Logo_light.png";
import "../style.css"
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer>
            <Link to="/" className="nav-link"><img src={logo} className="icon" alt="Home"></img></Link><p> 2022 OnCourse, MonsterInc </p>
            <a href="#">Terms</a>
            <a href="#">About</a>
            <a href="#" className="instagram"><FaInstagram></FaInstagram></a>
            <a href="#" className="facebook"><FaFacebookSquare></FaFacebookSquare></a>
            <a href="#" className="twitter"><FaTwitter></FaTwitter></a>
        </footer>
    )
}
export default Footer;
