import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const {t} = useTranslation();
    return (
      <div>
        <Navbar/>
        <h1>{t("PageNotFound")}</h1>
        <Footer/>
      </div>
    );
  };

export default PageNotFound;