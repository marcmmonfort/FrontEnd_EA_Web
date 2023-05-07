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
        <Link to="/feed">Feed</Link>
        <Link to="/discovery">Discovery</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/calendarevents">Calendar and Events</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">LogOut</Link>
			</nav>
		</header>
	);
};

export default Navbar;