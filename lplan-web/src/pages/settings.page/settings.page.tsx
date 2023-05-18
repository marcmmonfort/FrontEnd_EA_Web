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
      <Navbar />
      <div>
        <h1>User configuration </h1>
        <p>Here we will implement the user settings</p>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
