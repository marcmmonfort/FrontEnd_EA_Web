import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_6.jpg';

const Messages = () => {
    useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    }, []);
    return (
      <div>
        <Navbar/>
        <div className="titleContainer">
          <h1 className="titleSection">Messages</h1>
        </div>
        <Footer/>
      </div>
    );
  };

export default Messages;