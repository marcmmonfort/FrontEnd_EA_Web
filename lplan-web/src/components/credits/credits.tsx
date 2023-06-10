import React from "react";
import "./credits.css";
import { Link } from 'react-router-dom';

import { useRef } from "react";

const Credits = () => {
  return (
    <footer>
      <div className="credits-content">
        <p>Credits to Brain Farm and © Dave / Neighbourhood Recordings 2019</p>
      </div>
    </footer>
  );
};

export default Credits;