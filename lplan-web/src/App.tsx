import React from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './models/user.model';
import RegisterForm from './pages/register.page';


function App() {
  const handleRegister = async (authData: any) => {
    // Aquí puedes enviar los datos del formulario a un servidor y procesar la respuesta
    console.log('Datos del formulario de REGISTRO:', authData);
  };
  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  )
};

export default App;
