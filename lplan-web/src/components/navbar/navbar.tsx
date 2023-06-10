import React from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import icon from "../../assets/images/logo_lp_1.png";
import { AuthService } from "../../services/auth.service";

const Navbar = () => {
    const handleLogout = () => {
        AuthService.logOut();

    }

    return (
        <header>
          <img className="logo" src={icon} alt="Logo" />
          <nav>
            <Link to="/messages" className="logout-link">
              <FontAwesomeIcon className="logout-link" icon={faBell} />
            </Link>
            <Link to="/feed">Feed</Link>
            <Link to="/discovery">Discovery</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/calendarevents">Calendar</Link>
            <Link to="/map">Locations</Link>
            <Link to="/profile">
              <FontAwesomeIcon className="profile-link" icon={faUser} />
            </Link>
            <Link to="/" onClick={handleLogout} className="logout-link">
              <FontAwesomeIcon className="logout-link" icon={faSignOutAlt} />
            </Link>
          </nav>
        </header>
      );
};

export default Navbar;