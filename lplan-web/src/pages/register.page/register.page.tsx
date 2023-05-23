import React, { useState, useEffect } from "react";
import { UserAuthEntity } from "../../models/user.model";
import Input from "../../components/input/input.component";
import Select from "../../components/select/select.component";
import Swal from 'sweetalert2';
import PasswordForm from "../../components/password/password.component";
import { AuthService } from "../../services/auth.service";

import './register.page.css';

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_1.jpg';
import { Link, useNavigate } from "react-router-dom";

export interface RegisterProps {
  onSubmit: (data: UserAuthEntity) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ onSubmit }) => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, []);

  const [user, setUser] = useState<UserAuthEntity>({
    appUser: '',
    nameUser: '',
    surnameUser: '',
    mailUser: '',
    passwordUser: '',
    photoUser: 'photo.jpg',
    birthdateUser: new Date(),
    genderUser: 'male',
    ocupationUser: '',
    descriptionUser: '',
    roleUser: 'common',
    privacyUser: false,
    deletedUser: false,
  });
  const navigate = useNavigate();
  

  // Handle para input tipo checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: checked }));

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
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
              icon: 'swal-icon-color',
              title: 'swal-title-font',
              popup: 'swal-popup-width'
            },
            title: 'Register Succesful!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1000,
            iconColor: '#000',
            background: '#66fcf1',
            backdrop: `rgba(0,0,0,0.8)`
          }).then(() => {
            navigate("/login");    
          });
        }
      })
      .catch((error: any) => {
        console.error(error);
        console.log(error.response)
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color',
            title: 'swal-title-font',
            popup: 'swal-popup-width'
          },
          title: 'This User already exists!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1000,
          iconColor: '#000',
          background: '#66fcf1',
          backdrop: `rgba(0,0,0,0.8)`
        }).then(() => {
          navigate("/login");    
        });
          
    });
      
  };  

  return (
    <div className="col-md-12">
      <div className="titleContainer">
          <h1 className="titleSection">Register</h1>
        </div>
      <div className="button-container-back">
        <Link to="/" className="buttonBack">Back</Link>
      </div>
      <div className="card-container">
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
        <form className="registerForm" onSubmit={handleSubmit}>
          <Input label="Username" name="appUser" type="text" value={user.appUser} onChange={handleChange} />
          <Input label="Name" name="nameUser" type="text" value={user.nameUser} onChange={handleChange} />
          <Input label="Surname" name="surnameUser" type="text" value={user.surnameUser} onChange={handleChange} required/>
          <Input label="Email" name="mailUser" type="email" value={user.mailUser} onChange={handleChange} required/>
          <Input label="Password" name="passwordUser" type="password" value={user.passwordUser} onChange={handleChange} required/>
          <Input label="Photo URL" name="photoUser" type="text" value={user.photoUser} onChange={handleChange} required/>
          <Input label="Birthdate" name="birthdateUser" type="date" value={new Date(user.birthdateUser).toISOString().substr(0, 10)} onChange={handleChange} required/>
          <Input label="Description" name="descriptionUser" type="text" value={user.descriptionUser} onChange={handleChange} required/>
          <Select label="Gender" name="gender" value={user.genderUser} onChange={handleSelectChange} options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]} />
          <Input label="Privacy" name="privacyUser" type="checkbox" checked={user.privacyUser} onChange={handleChange}/>
          <button className="buttonBack" type="submit">Register</button>
        </form>
      </div>
      <Footer/>
    </div>
 );
}

export default RegisterForm;