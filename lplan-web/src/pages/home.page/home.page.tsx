import React from "react";

import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
// @ts-ignore
import video from "../../assets/images/homebackground.mp4";

import './home.page.css';

const Home = () => {
  return (
    <div>
      <div className="container">
        <h1 className="title">Lplan</h1>
        <div className="button-container">
          <Link to="/login" className="button">LogIn</Link>
          <Link to="/register" className="button">Register</Link>
        </div>
        <video autoPlay loop muted className="fullscreen-bg__video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Footer/>
    </div>
  )
};

export default Home;