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
        <div className="titleContainer">
          <h1 className="titleSection">Settings</h1>
          <div className="LanguageButtons">
            <a href="/es/" className="LanguageButtonESP"> Spanish</a>
            <a href="/en/" className="LanguageButtonENG">English</a>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default SettingsPage;
