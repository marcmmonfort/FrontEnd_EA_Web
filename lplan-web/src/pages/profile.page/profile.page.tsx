import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_7.jpg';
document.body.style.backgroundImage = `url(${backgroundImage})`;

const Profile = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="containerSection">
        <h1 className="titleSection">Profile</h1>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;