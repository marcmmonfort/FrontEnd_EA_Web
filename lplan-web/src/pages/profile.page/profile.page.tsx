import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import './profile.page.css';
// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_7.jpg';
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
document.body.style.backgroundImage = `url(${backgroundImage})`;





const Profile = () => {
    
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
      const getUser = async () => {
        try {
          const user = await AuthService.getCurrentUser().user;
          setCurrentUser(user);
          console.log("current user = " + user)
        } catch (error) {
          window.location.href = '/home'
        }
      };

      document.body.style.backgroundImage = `url(${backgroundImage})`;
      getUser();
    }, []);


    return (
      <div>
        <Navbar/>
        <div className="containerSection">
          <h1 className="titleSection">Profile</h1>
        </div>
        <Footer/>
        <div className="col-md-12">
      
        {currentUser && (
          <div className="profile-container">
          <div className="profile">
            <div className="profile-image">
              <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
            </div>
            <div className="profile-user-settings">
              <h1 className="profile-user-name">{currentUser.appUser}</h1>
              <button className="btn_profile-edit-btn">Edit Profile</button>
              <Link to="/settings" className="btn_profile-settings-btn" aria-label="profile settings">Settings<i className="fas fa-cog" aria-hidden="true"></i></Link>
            </div>
            <div className="profile-stats">
              <ul>
                <li>You have <span className="profile-stat-count">{currentUser.followersUser?.length}</span> followers</li>
                <li><span className="profile-stat-count">{currentUser.followedUser?.length}</span> people is following you</li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>Name: <span className="profile-real-name">{currentUser.nameUser}</span></p>
              <p>Description: {currentUser.descriptionUser}</p>
            </div>
          </div>
        </div>        
        )}
      <Footer/>
      </div>
      
    </div>
    );
  };

export default Profile;