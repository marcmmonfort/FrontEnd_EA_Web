import React from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import icon from "../../assets/images/logo_lp_1.png";

const Navbar = () => {
    return (
		<header>
			<img className="logo" src={icon} alt="Logo" />
			<nav>
                <a href="#">Feed</a>
                <a href="#">Discovery</a>
                <a href="#">Messages</a>
                <a href="#">Calendar and Events</a>
                <a href="#">Profile</a>
			</nav>
		</header>
	);
};

export default Navbar;