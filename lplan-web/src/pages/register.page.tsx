import React, { useState } from "react";
import { User } from "../models/user.model";
import Input from "../components/input.component";
import Select from "../components/select.component";
import Swal from 'sweetalert2';
import PasswordForm from "../components/password.component";
import { AuthService } from "../services/auth.service";

export interface RegisterProps {
  onSubmit: (data: User) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ onSubmit }) => {
  const [errors, setErrors] = useState<Partial<User>>({});
  const [user, setUser] = useState<User>({
    appUser: '',
    nameUser: '',
    surnameUser: '',
    mailUser: '',
    passwordUser: '',
    photoUser: 'Hola que tal',
    birthdateUser: new Date(),
    genderUser: 'male',
    ocupationUser: '',
    descriptionUser: '',
    roleUser: 'common',
    privacyUser: false,
    deletedUser: false,
  });

  // Handle para input tipo checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: checked }));

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    console.log(user);
  };

  // Handle para select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    console.log(user);
    // Convertir el valor a una instancia de `Date`
    const dateValue = name === 'birthdateUser' ? new Date(value) : value;
    
    setUser((prevUser) => ({ ...prevUser, [name]: dateValue }));
  };

  const handlePasswordSubmit = (password: string) => {
    setUser((prevUser) => ({ ...prevUser, passwordUser: password }));
    console.log(user);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Partial<User> = {};
    if (!user.mailUser) {
      validationErrors.mailUser = 'Please enter your email address';
    }
    if (!user.passwordUser) {
      validationErrors.passwordUser = 'Please enter your password';
    }
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    console.log(user);
    AuthService.register(user)
      .then((response: any) => {
        console.log(user);
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Register succefull!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
            backdrop: `
            rgba(0,0,0,0.8)
            `
          })
          //window.location.href = '/home';
        }
      })
      .catch((error: any) => {
        console.error(error);
        console.log(error.response)
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'This user already exists!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
      
    });
      
  };  

  return (
    <><div className="col-md-12">
        <div className="card card-container">
          <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card" />
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="appUser"
            type="text"
            value={user.appUser}
            onChange={handleChange} />
          <Input
            label="Name"
            name="nameUser"
            type="text"
            value={user.nameUser}
            onChange={handleChange} />
          <Input
            label="Surname"
            name="surnameUser"
            type="text"
            value={user.surnameUser}
            onChange={handleChange} 
            required/>
          <Input
            label="Email"
            name="mailUser"
            type="email"
            value={user.mailUser}
            onChange={handleChange} 
            required/>
          <PasswordForm onSubmit={handlePasswordSubmit} />
          <Input
            label="Photo"
            name="photoUser"
            type="text"
            value={user.photoUser}
            onChange={handleChange} 
            required/>
          <Input
            label="Birthdate"
            name="birthdateUser"
            type="date"
            value={new Date(user.birthdateUser).toISOString().substr(0, 10)}

            onChange={handleChange} 
            required/>
          <Select
            label="Gender"
            name="gender"
            value={user.genderUser}
            onChange={handleSelectChange}
            options={[
              { value: "", label: "Choose an option" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            defaultValue=""
            required/>
          <Input
            label="Description"
            name="descriptionUser"
            type="text"
            value={user.descriptionUser}
            onChange={handleChange} 
            required/>
          <Input
            label="Privacy"
            name="privacyUser"
            type="checkbox"
            checked={user.privacyUser}
            onChange={handleChange}/>
          <button type="submit">Register</button>
        </form>
      </div>
    </div></>
 );
}
export default RegisterForm;

