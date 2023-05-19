import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./edituser.page.css";
// Fondo de pantalla personalizado ...
import backgroundImage from "../../assets/images/background_7.jpg";
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import Swal from "sweetalert2";
import Input from "../../components/input/input.component";
import Select from "../../components/select/select.component";
import {UserService} from "../../services/user.service";
document.body.style.backgroundImage = `url(${backgroundImage})`;

const EditUser = () => {
  const [user, setUser] = useState<User>({
    appUser: "",
    nameUser: "",
    surnameUser: "",
    mailUser: "",
    passwordUser: "",
    photoUser: "photo.jpg",
    birthdateUser: new Date(),
    genderUser: "male",
    ocupationUser: "",
    descriptionUser: "",
    roleUser: "common",
    privacyUser: false,
    deletedUser: false,
  });

  useEffect(() => {
    const getUser = async () => {
      const userId = AuthService.getCurrentUser();
      if(userId){
        UserService.getPerson(userId)
          .then(response => {
            console.log(response);
            console.log(response.data);
            setUser(response.data);
          })
          .catch(error => {
            window.location.href = '*';
          });
      }
    };

    document.body.style.backgroundImage = `url(${backgroundImage})`;
    getUser();
  }, []);

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
    const dateValue = name === "birthdateUser" ? new Date(value) : value;

    setUser((prevUser) => ({ ...prevUser, [name]: dateValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(user);
    UserService.editUser(user)
      .then((response: any) => {
        console.log(user);
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            customClass: {
              icon: "swal-icon-color",
              title: "swal-title-font",
              popup: "swal-popup-width",
            },
            title: "Edit succesfull!",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1000,
            iconColor: "#000",
            background: "#66fcf1",
            backdrop: `rgba(0,0,0,0.8)`,
          }).then(() => {
            console.log(response.data);
            window.location.href = '/profile';
          });
        }
      })
      .catch((error: any) => {
        console.error(error);
        console.log(error.response);
        Swal.fire({
          position: "center",
          icon: "info",
          customClass: {
            icon: "swal-icon-color",
            title: "swal-title-font",
            popup: "swal-popup-width",
          },
          title: "The edit was not possible!",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1000,
          iconColor: "#000",
          background: "#66fcf1",
          backdrop: `rgba(0,0,0,0.8)`,
        }).then(() => {
          window.location.href = "/profile";
        });
      });
  };
  return (
    <div>
      <Navbar/>
        <div className="titleContainer">
          <h1 className="titleSection">Edit User</h1>
        </div>
      <div className="col-md-12">
        {user && (
          <div className="profile-container">
            <div className="profile">
              <div className="profile-image">
                <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="profile-img"
                  className="profile-img-card-edit"
                />
              </div>
              <Link to="/profile" className="button">Back</Link>
              <div className="profile-bio">
                <div className="card-container">
                  <form className="editForm" onSubmit={handleSubmit}>
                    <Input
                      label="Username"
                      name="appUser"
                      type="text"
                      readOnly={true}     
                      value={user.appUser}
                      onChange={handleChange}
                    />
                    <Input
                      label="Name"
                      name="nameUser"
                      type="text"
                      value={user.nameUser}
                      onChange={handleChange}
                    />
                    <Input
                      label="Surname"
                      name="surnameUser"
                      type="text"
                      value={user.surnameUser}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      name="mailUser"
                      type="email"
                      readOnly={true} 
                      value={user.mailUser}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Photo URL"
                      name="photoUser"
                      type="text"
                      value={user.photoUser}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Birthdate"
                      name="birthdateUser"
                      type="date"
                      readOnly={true} 
                      value={new Date(user.birthdateUser)
                        .toISOString()
                        .substr(0, 10)}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Description"
                      name="descriptionUser"
                      type="text"
                      value={user.descriptionUser}
                      onChange={handleChange}
                      required
                    />
                    <Select
                      label="Gender"
                      name="gender"
                      value={user.genderUser}
                      onChange={handleSelectChange}
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ]}
                    />
                    <Input
                      label="Privacy"
                      name="privacyUser"
                      type="checkbox"
                      checked={user.privacyUser}
                      onChange={handleChange}
                    />
                    <button className="buttonSave" type="submit">Save </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default EditUser;
