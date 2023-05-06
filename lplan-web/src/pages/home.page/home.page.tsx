import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Video from "../../assets/images/homebackground.mp4";
import './home.page.css';

const Home = () => {
  return (
    <div>
      <div className="container">
        <h1 className="title">Lplan</h1>
        <div className="button-container">
          <button className="button">LogIn</button>
          <button className="button">Register</button>
        </div>
        <video autoPlay loop muted className="fullscreen-bg__video">
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <Footer/>
    </div>
  )
};

export default Home;