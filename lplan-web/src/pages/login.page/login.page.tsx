import React, { useEffect, useState } from "react";

import PropTypes from 'prop-types';
import { Auth } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { error } from 'console';

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import './login.page.css';

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_2.jpg';
import { Link, useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (auth: Auth) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, []);

  const [formData, setFormData] = useState<Auth>({ mailUser: '', passwordUser: '' });
  const [errors, setErrors] = useState<Partial<Auth>>({});
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Partial<Auth> = {};
    if (!formData.mailUser) {
      validationErrors.mailUser = 'Enter your email address!';
    }
    if (!formData.passwordUser) {
      validationErrors.passwordUser = 'Enter your password!';
    }
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    AuthService.login(formData)
      .then((response: any) => {
        console.log(formData);
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color',
              title: 'swal-title-font',
              popup: 'swal-popup-width'
            },
            title: 'LogIn Succesful!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1000,
            iconColor: '#000',
            background: '#66fcf1',
            backdrop: `rgba(0,0,0,0.8)`
          }).then(() => {
            console.log(response.data);
            AuthService.setCurrentUser(JSON.stringify(response.data.user.uuid), JSON.stringify(response.data.token));
            console.log('_id' + JSON.stringify(response.data.user.uuid));
            console.log('token' + JSON.stringify(response.data.token));
            navigate('/profile');
          });
        }
      })
      .catch((error: any) => {
        console.error("error: " + error);
        console.log("error.response: " + error.response)
        switch (error.response.status) {
          case 403:
            Swal.fire({
              position: 'center',
              icon: 'error',
              customClass: {
                icon: 'swal-icon-color',
                title: 'swal-title-font',
                popup: 'swal-popup-width'
              },
              title: 'Incorrect Password!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1000,
              iconColor: '#000',
              background: '#66fcf1',
              backdrop: `rgba(0,0,0,0.8)`
            });
            break;
          case 404:
            Swal.fire({
              position: 'center',
              icon: 'info',
              customClass: {
                icon: 'swal-icon-color',
                title: 'swal-title-font',
                popup: 'swal-popup-width'
              },
              title: 'This User does not exist!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1000,
              iconColor: '#000',
              background: '#66fcf1',
              backdrop: `rgba(0,0,0,0.8)`
            }).then(() => {
              navigate("/register");    
            }); 
            break;

            
            
        }
      
    });
      
  };  

  return (
    <form onSubmit={handleSubmit}>

      <div className="loginForm">
        <div className="titleContainer">
          <h1 className="titleSection">Login</h1>
        </div>
        <div className="button-container-back">
          <Link to="/" className="buttonBack">Back</Link>
        </div>
        <div className="emailEntry">
          <label htmlFor="mailUser">Email</label>
          <input id="mailUser" name="mailUser" type="email" value={formData.mailUser} onChange={handleInputChange} />
          {errors.mailUser && <span>{errors.mailUser}</span>}
        </div>
        <div className="passwordEntry">
          <label htmlFor="passwordUser">Password</label>
          <input id="passwordUser" name="passwordUser" type="password" value={formData.passwordUser} onChange={handleInputChange} />
          {errors.passwordUser && <span>{errors.passwordUser}</span>}
        </div>
        <button className="loginRegisterButton" type="submit">LogIn</button>
        <Footer/>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;