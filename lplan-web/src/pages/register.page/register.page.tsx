import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import './register.page.css';

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_1.jpg';

const Register = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, []);
  return (
    <div>
      <div className="containerSection">
        <h1 className="titleSection">Register</h1>
      </div>
      <Footer/>
    </div>
  )
};

export default Register;