import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faBell, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import icon from "../../assets/images/logo_lp_1.png";
import { AuthService } from "../../services/auth.service";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate(); // Hook useNavigate para realizar la navegación

  useEffect(() => {
    let recognition: any;

    const config = AuthService.getVoiceControl();
    console.log(config);
    console.log("Estoy en el useEffect de navbar");
    if(config === "si"){
      setIsListening(true);
      // Verificar si el navegador es compatible con la API de reconocimiento de voz
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        recognition = new ((window as any).webkitSpeechRecognition)();

        // Configurar el idioma del reconocimiento de voz
        recognition.lang = "es-ES,en-US"; // Establece el idioma deseado, como 'es' para español

        // Configurar si el reconocimiento debe continuar después de detectar un resultado
        recognition.continuous = true; // Configura el reconocimiento continuo

        recognition.onstart = () => {
          // Se activa cuando comienza el reconocimiento de voz
          console.log("Escuchando...");
        };

        recognition.onresult = (event: any) => {
          // Se activa cuando se detecta un resultado de voz
          const { transcript } = event.results[event.results.length - 1][0];
          console.log(transcript);
          processVoiceCommand(transcript);
        };

        recognitionRef.current = recognition;
        recognition.start();
      }
    }
    
  }, []);

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  const startVoiceRecognition = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopVoiceRecognition = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      AuthService.setVoiceControl("no");
    }
  };

  const processVoiceCommand = (command: string) => {
    switch (command) {
      case "Muro." || "muro" || "feed" || "Feed.":
        navigate("/feed"); // Navegación al feed
        break;
      case "Descubrimiento." || "descubrimiento" || "Discovery." || "discovery":
        navigate("/discovery"); // Navegación al descubrimiento
        break;
      case "Mensajes." || "mensajes":
        navigate("/messages"); // Navegación a los mensajes
        break;
      case "Calendario." || "calendario":
        navigate("/calendarevents"); // Navegación al calendario
        break;
      case "Ubicaciones." || "ubicaciones":
        navigate("/map"); // Navegación a las ubicaciones
        break;
      case "Perfil." || "perfil":
        navigate("/profile"); // Navegación al perfil
        break;
      case "Cerrar sesión." || "cerrar sesion":
        handleLogout();
        navigate("/");
        break;
      case "Finalizar." || "finalizar":
        stopVoiceRecognition();
        break;
      default:
        break;
    }
  };

    const handleLogout = () => {
        AuthService.logOut();

    }
    const { t } = useTranslation();

    return (
        <header>
          <img className="logo" src={icon} alt="Logo" />
          <nav className={showMenu ? "open" : ""}>
            <Link to="/messages" className="logout-link">
              <FontAwesomeIcon className="logout-link" icon={faBell} />
            </Link>
            <Link to="/feed">{t("Feed")}</Link>
            <Link to="/discovery">{t("Discovery")}</Link>
            <Link to="/messages">{t("Messages")}</Link>
            <Link to="/calendarevents">{t("Calendar")}</Link>
            <Link to="/map">{t("Locations")}</Link>
            <Link to="/profile">
              <FontAwesomeIcon className="profile-link" icon={faUser} />
            </Link>
            <Link to="/" onClick={handleLogout} className="logout-link">
              <FontAwesomeIcon className="logout-link" icon={faSignOutAlt} />
            </Link>
            {isListening && (
              <button className="microphone_button" onClick={toggleVoiceRecognition}>
                {isListening ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}
              </button>
            )}
          </nav>
        </header>
      );
};

export default Navbar;
