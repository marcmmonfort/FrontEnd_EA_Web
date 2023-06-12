import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import i18next from "i18next";
import Navbar from "../../components/navbar/navbar";
import Credits from "../../components/credits/credits";

// @ts-ignore
import video from "../../assets/images/homebackground.mp4";

import './home.page.css';

const Home = () => {
  const {t} = useTranslation();
  return (
    <div>
      <div className="container">
        <h1 className="title">Lplan</h1>
        <div className="button-container">
          <Link to="/login" className="button">{t("Login")}</Link>
          <Link to="/register" className="button">{t("Register")}</Link>
        </div>
        <video autoPlay loop muted className="fullscreen-bg__video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Credits/>
    </div>
  )
};

export default Home;