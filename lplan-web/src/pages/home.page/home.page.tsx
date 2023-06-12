import React, { useEffect ,useState} from "react";

import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Navbar from "../../components/navbar/navbar";
import Credits from "../../components/credits/credits";
// @ts-ignore
import video from "../../assets/images/homebackground.mp4";

import "./home.page.css";


const Home = () => {
  const [user, setUser] = useState<any>(null);

  
  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    //console.log(credentialResponse);
    //console.log(credentialResponse.credential) // Verifica la estructura de la respuesta en la consola
    var decoded:any = jwt_decode(credentialResponse.credential);
    console.log(decoded)
    // Extrae la información del usuario de la respuesta de Google
    const userData = {
      nameUser:decoded.given_name,
      surnameUser:decoded.family_name,
      emailUser:decoded.email,
      photoUser:decoded.picture
      // Puedes extraer más campos según tus necesidades
    };
    console.log(JSON.stringify(userData))

    setUser( userData);
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
        </div>
        <video autoPlay loop muted className="fullscreen-bg__video">
          <source src={video} type="video/mp4" />
        </video>
        <div id="signInButton">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
    </div>
      </div>
      <Credits />
    </div>
  );
};

export default Home;
