import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import './profile.page.css';
// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_7.jpg';
import { AuthService } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Publication } from "../../models/publication.model";
import { PublicationService } from "../../services/publication.service";
import Filter from 'bad-words';

document.body.style.backgroundImage = `url(${backgroundImage})`;

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("hola");
  const navigate = useNavigate();
  const [listOwnPublications, setListOwnPublications] = useState<Publication[]>([]);
  const [numPagePublication, setNumPagePublication] = useState<number>(1);
  const [numOwnPublications, setNumOwnPublications] = useState<number>(0);
  const [recargar, setRecargar] = useState<string>('');
  const [currentPublicationIndex, setCurrentPublicationIndex] = useState(1);

  useEffect(() => {
    const id = AuthService.getCurrentUser();
    console.log(id);
    if(id){
      setUserId(id);
      UserService.getPerson(id)
      .then(response => {
        console.log(response);
        console.log(response.data);
        if (response.data && response.data.descriptionUser) {
          
          const customFilter = new Filter({regex: /\*|\.|$/gi});
          customFilter.addWords('idiota', 'retrasado');

          const filteredDescription = customFilter.clean(response.data.descriptionUser);
          console.log(filteredDescription);
        
          response.data.descriptionUser = filteredDescription;
          setCurrentUser(response.data);
        }
        
        


        const audioDescription = AuthService.getAudioDescription();
        // Leer el texto del usuario actual en voz alta al cargar la página
        if (audioDescription === "si") {
          const appUserToSpeech = `appUser: ${response.data.appUser}`;
          speakText(appUserToSpeech);
          setTimeout(() => {
            const followersUserToSpeech = `followed by: ${response.data.followersUser.length}`;
            speakText(followersUserToSpeech);
          }, 500);
          setTimeout(() => {
            const followingUserToSpeech = `followed by: ${response.data.followedUser.length}`;
            speakText(followingUserToSpeech);
          }, 500);
          setTimeout(() => {
            const followingUserToSpeech = `user name: ${response.data.nameUser}`;
            speakText(followingUserToSpeech);
          }, 500);
          setTimeout(() => {
            const descriptionToSpeech = `description: ${response.data.descriptionUser}`;
            speakText(descriptionToSpeech);
          }, 500);
        }
      })
      .catch(error => {
        navigate('*');
      });
    }
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    console.log(id);
    if (userId) {
      PublicationService.obtainOwnPosts(id)
        .then((response) => {      
          const publications = response.data;

          if (publications.length != 0){
            const firstTransparentPublication = {
              ...publications[0],
              photoPublication: ["https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png?20091205084734"],
            };
            const lastTransparentPublication = {
              ...publications[0],
              photoPublication: ["https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png?20091205084734"],
            };
            // Publicación transparente al principio ...
            publications.unshift(firstTransparentPublication);
            // Publicación transparente al final ...
            publications.push(lastTransparentPublication);
          }    
                    
          setListOwnPublications(publications);
          setNumOwnPublications(publications.length);
      })
      .catch(error => {
        navigate("*");
      });
    }

  }, [numPagePublication, recargar]);

  // Función para leer el texto en voz alta
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en";
    window.speechSynthesis.speak(utterance);
  };

  const handleNextPublication = () => {
    setCurrentPublicationIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= numOwnPublications-1) {
        return prevIndex;
      } else {
        return newIndex;
      }
    });
  };
  
  const handlePreviousPublication = () => {
    setCurrentPublicationIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 1) {
        return prevIndex;
      } else {
        return newIndex;
      }
    });
  };

  const currentPublication = listOwnPublications[currentPublicationIndex];
  const previousPublication = listOwnPublications[currentPublicationIndex-1];
  const nextPublication = listOwnPublications[currentPublicationIndex+1];

  return (
    <div>
      <Navbar/>
      <div className="titleContainer">
        <h1 className="titleSection">Profile</h1>
      </div>
      <div className="profileContour">
        {currentUser && (
          <div className="profile-container">
            <div className="profile">
              <h1 className="profile-user-name">{currentUser.appUser}</h1>
              <div className="profile-image">
                <img src={currentUser.photoUser} alt="profile-img" className="profile-img-card" />
              </div>
              <div className="profile-user-buttons">
                <Link to="/profile/edituser" className="buttonProfile">Edit Profile</Link>
                <Link to="/profile/settings" className="buttonProfile">Settings</Link>
              </div>
              <div className="profile-stats">
                <h1 className="profileTitleFollowers">Followers</h1>
                <h1 className="profile-stat-count"><Link  to={`/profile/userList/${userId}/followers`}>{currentUser.followersUser?.length}</Link></h1>
                <h1 className="profileTitle">Following</h1>
                <h1 className="profile-stat-count"><Link  to={`/profile/userList/${userId}/following`}>{currentUser.followedUser?.length}</Link></h1>
              </div>
              <div className="profile-bio">
                <h1 className="profileTitle">Name</h1>
                <p><span className="profile-real-name">{currentUser.nameUser}</span></p>
                <h1 className="profileTitle">Description</h1>
                <p>{currentUser.descriptionUser}</p>
              </div>
              <div className="profile-album">
                <div className="feed">
                  <div className="profile_post">
                    <div className="new_profile_post">
                      {currentPublication && (
                        <div>
                          <div className="row_pictures">
                            <button className="new_button" onClick={handlePreviousPublication} disabled={currentPublicationIndex === 1}>
                              <img className="new_profile_post_image_L" src={previousPublication.photoPublication[0]} />
                            </button>
                            <img className="new_profile_post_image" src={currentPublication.photoPublication[0]} />
                            <button className="new_button" onClick={handleNextPublication} disabled={currentPublicationIndex === listOwnPublications.length - 2}>
                              <img className="new_profile_post_image_R" src={nextPublication.photoPublication[0]} />
                            </button>
                          </div>
                          <p className="new_profile_post_text">{currentPublication.textPublication}</p>
                          <p className="new_profile_post_time">{new Date(currentPublication.createdAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
