import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../../components/navbar/navbar";
import Credits from "../../components/credits/credits";
// @ts-ignore
import video from "../../assets/images/homebackground.mp4";

import "./home.page.css";

const Home = () => {
  const responseMessage = (response:any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log('Login Failed');
  };
  return (
    <div>
      <div className="container">
        <h1 className="title">Lplan</h1>
        <div className="button-container">
          <Link to="/login" className="button">
            LogIn
          </Link>
          <Link to="/register" className="button">
            Register
          </Link>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
        <video autoPlay loop muted className="fullscreen-bg__video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Credits />
    </div>
  );
};

export default Home;
