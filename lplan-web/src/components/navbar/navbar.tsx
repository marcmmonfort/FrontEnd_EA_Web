import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import icon from "../../assets/images/logo_lp_1.png";
import { AuthService } from "../../services/auth.service";

const Navbar = () => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // Hook useNavigate para realizar la navegación

  useEffect(() => {
    let recognition: any;

    // Verificar si el navegador es compatible con la API de reconocimiento de voz
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      recognition = new ((window as any).webkitSpeechRecognition)();

      // Configurar el idioma del reconocimiento de voz
      recognition.lang = "es"; // Establece el idioma deseado, como 'es' para español

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
    }
  };

  const processVoiceCommand = (command: string) => {
    switch (command) {
      case "Feed.":
        navigate("/feed"); // Navegación al feed
        break;
      case "Descubrir.":
        navigate("/discovery"); // Navegación al descubrimiento
        break;
      case "Mensajes.":
        navigate("/messages"); // Navegación a los mensajes
        break;
      case "Calendario.":
        navigate("/calendarevents"); // Navegación al calendario
        break;
      case "Ubicaciones.":
        navigate("/map"); // Navegación a las ubicaciones
        break;
      case "Perfil.":
        navigate("/profile"); // Navegación al perfil
        break;
      case "Cerrar sesión.":
        handleLogout();
        navigate("/");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    AuthService.logOut();
  };

  return (
    <header>
      <img className="logo" src={icon} alt="Logo" />
      <nav className={showMenu ? "open" : ""}>
        <Link to="/messages" className="logout-link">
          <FontAwesomeIcon className="logout-link" icon={faBell} />
        </Link>
        <Link to="/feed">Feed</Link>
        <Link to="/discovery">Discovery</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/calendarevents">Calendar</Link>
        <Link to="/map">Locations</Link>
        <Link to="/profile">
          <FontAwesomeIcon className="profile-link" icon={faUser} />
        </Link>
        <Link to="/" onClick={handleLogout} className="logout-link">
          <FontAwesomeIcon className="logout-link" icon={faSignOutAlt} />
        </Link>
      </nav>
      <button className="voice-recognition" onClick={toggleVoiceRecognition}>
        {isListening ? "Detener" : "Escuchar"}
      </button>
    </header>
  );
};

export default Navbar;
