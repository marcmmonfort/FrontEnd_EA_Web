import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import './login.page.css';

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_2.jpg';
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, []);
  return (
    <div className="register-container">
      <div className="button-container-back">
        <Link to="/" className="buttonBack">Back</Link>
      </div>
      <div className="containerSection">
        <h1 className="titleSection">Login</h1>
      </div>
      <Footer/>
    </div>
  )
};

export default Login;