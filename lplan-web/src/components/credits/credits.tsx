import React from "react";
import "./credits.css";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

import { useRef } from "react";

const Credits = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="credits-content">
        <p>{t("Credits")}</p>
      </div>
    </footer>
  );
};

export default Credits;