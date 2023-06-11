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
import {useTranslation} from "react-i18next";
import i18next from "i18next";
document.body.style.backgroundImage = `url(${backgroundImage})`;

const lngs:any= {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

const SettingsPage = () => {
  const {t,i18n} = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="titleContainer">
        <h1 className="titleSection">{t("Settings")}</h1>
        <div className="LanguageButtons">
          {Object.keys(lngs).map((lng) => (
            <button
              type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
