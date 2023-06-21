import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./edituser.page.css";
// Fondo de pantalla personalizado ...
import backgroundImage from "../../assets/images/background_7.jpg";
import { AuthService } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import Swal from "sweetalert2";
import Input from "../../components/input/input.component";
import Select from "../../components/select/select.component";
import { useTranslation } from 'react-i18next';
import {UserService} from "../../services/user.service";
document.body.style.backgroundImage = `url(${backgroundImage})`;

const EditUser = () => {
  const [user, setUser] = useState<User>({
    uuid:"",
    appUser: "",
    mailUser:"",
    nameUser: "",
    surnameUser: "",
    photoUser: "photo.jpg",
    birthdateUser: new Date(),
    genderUser: "male",
    ocupationUser: "",
    descriptionUser: "",
    roleUser: "common",
    privacyUser: false,
    deletedUser: false,
  });
  const [privacy, setPrivacy] = useState<boolean>(false);
  //const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    const getUser = async () => {
      const userId = AuthService.getCurrentUser();
      if(userId){
        UserService.getPerson(userId)
          .then(response => {
            console.log(response);
            console.log(response.data);
            setUser(response.data);
            setPrivacy(response.data.privacyUser);
          })
          .catch(error => {
            navigate("*");
          });
      }
    };

    document.body.style.backgroundImage = `url(${backgroundImage})`;
    getUser();
  }, []);

  

  const handlePrivacy = () => {
    const newPrivacy = !privacy;
    setPrivacy(newPrivacy);
    setUser((prevUser) => ({ ...prevUser, privacyUser: newPrivacy }));
  };

  // Handle para input tipo checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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

  console.log(user);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(user);
    UserService.editUser(user)
      .then((response: any) => {
        console.log(user);
        console.log(response);
        console.log(response.status);
        if (response.request.status === 200) {
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
            navigate("/profile");
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
          navigate("/profile");
        });
      });
  };

  /*
  const deleteUser  = () => {
    if (confirmDelete) {
      setUser(prevUser => ({ ...prevUser, deletedUser: true }));
    } else {
      setConfirmDelete(true);
    }

    handleSubmit();
  };

  
  <div>
                    {confirmDelete ? (
                      <div>
                        <p>Are you sure that you want to delete?</p>
                        <button className="buttonConfirm" onClick={deleteUser}>
                          Confirmar
                        </button>
                        <button className="buttonCancel" onClick={() => setConfirmDelete(false)}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button className="buttonDelete" onClick={deleteUser}>
                        Eliminar
                      </button>
                    )}
                  </div>
  */

  return (
    <div>
      <Navbar/>
        <div className="titleContainer">
          <h1 className="titleSection">{t("EditUser")}</h1>
        </div>
      <div className="col-md-12">
        {user && (
          <div className="profile-container">
            <div className="profile">
              <div className="profile-image">
                <img
                  src={user.photoUser}
                  alt="profile-img"
                  className="profile-img-card-edit"
                />
              </div>
              <Link to="/profile" className="button">{t("Back")}</Link>
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
                    <input
                      type="checkbox"
                      name="privacyUser"
                      checked={privacy}
                      onChange={handlePrivacy}
                    />
                    
                    <button className="buttonSave" type="submit">{t("Save")}</button>
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
