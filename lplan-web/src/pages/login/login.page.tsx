import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { error } from 'console';

interface LoginFormProps {
  onSubmit: (auth: Auth) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Auth>({ mailUser: '', passwordUser: '' });
  const [errors, setErrors] = useState<Partial<Auth>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Partial<Auth> = {};
    if (!formData.mailUser) {
      validationErrors.mailUser = 'Please enter your email address';
    }
    if (!formData.passwordUser) {
      validationErrors.passwordUser = 'Please enter your password';
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
              icon: 'swal-icon-color'
            },
            title: 'LogIn succesful!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
            backdrop: `
              rgba(0,0,0,0.8)
            `
          });

          localStorage.setItem('token', response.token);
          //window.location.href = '/home';
        }
      })
      .catch((error: any) => {
        console.error("error: " + error);
        console.log("error.response: " + error.response)
        switch (error.response.status) {
          case 403:
            // Poner aquí el alert ...
            Swal.fire({
              position: 'center',
              icon: 'error',
              customClass: {
                icon: 'swal-icon-color'
              },
              title: 'Incorrect Password!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
              backdrop: `
                rgba(0,0,0,0.8)
              `
            });
            break;
          case 406:
            // Poner aquí el alert ...
            Swal.fire({
              position: 'center',
              icon: 'error',
              customClass: {
                icon: 'swal-icon-color'
              },
              title: 'You are not an admin!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
              backdrop: `
                rgba(0,0,0,0.8)
              `
            });
            break;
          case 404:
            // Poner aquí el alert ...
            Swal.fire({
              position: 'center',
              icon: 'info',
              customClass: {
                icon: 'swal-icon-color'
              },
              title: 'This user does not exist!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
              backdrop: `
                rgba(0,0,0,0.8)
              `
            });
            //this.router.navigate(['/register']);
            break;
        }
      
    });
      
  };  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="mailUser">Email</label>
        <input
          id="mailUser"
          name="mailUser"
          type="email"
          value={formData.mailUser}
          onChange={handleInputChange}
        />
        {errors.mailUser && <span>{errors.mailUser}</span>}
      </div>
      <div>
        <label htmlFor="passwordUser">Password</label>
        <input
          id="passwordUser"
          name="passwordUser"
          type="password"
          value={formData.passwordUser}
          onChange={handleInputChange}
        />
        {errors.passwordUser && <span>{errors.passwordUser}</span>}
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
