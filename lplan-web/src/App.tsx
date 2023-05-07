import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from './models/auth.model';
import LoginForm from './pages/login/login.page';



function App() {

  const handleLogin = async (authData: any) => {
    // Aquí puedes enviar los datos del formulario a un servidor y procesar la respuesta
    console.log('Datos del formulario de inicio de sesión:', authData);
  };
  return (
    <div className="App">
    <div>
      <h1>Inicio de sesión</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  
      
      



      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
