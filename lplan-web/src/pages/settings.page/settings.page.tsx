import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./settings.page.css";
// Fondo de pantalla personalizado ...
import backgroundImage from "../../assets/images/background_7.jpg";
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
document.body.style.backgroundImage = `url(${backgroundImage})`;

const SettingsPage = () => {
  return (
    <div>
        <Navbar/>
        <div>
            <h1>Configuración de usuario </h1>
            <p>Aquí es donde se editarán los ajustes del usuario.</p>
        </div>
        <Footer/>
    </div>
  );
};

export default SettingsPage;
