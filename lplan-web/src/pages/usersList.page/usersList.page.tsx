import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useTranslation} from "react-i18next"

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_4.jpg';
import './usersList.page.css';
import { PublicationService } from "../../services/publication.service";
import { PublicationLikes } from "../../models/publication.model";
import { AuthService } from "../../services/auth.service";

const UsersList = () => {
  const { userId, mode } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPublication, setcurrentPublication] = useState<PublicationLikes | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [numPage, setNumPage] = useState(1);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const isFollowersMode = mode === "followers";
  const isFollowingMode = mode === "following";
  const isLikesMode = mode === "likes";

  console.log(isFollowersMode);
  console.log(isFollowingMode);
  console.log(isLikesMode);
  const title = isFollowersMode ? "Followers" : isFollowingMode ? "Following" : "Likes";


  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    if(userId){
      
      if(isFollowersMode || isFollowingMode){
        console.log("Entro donde no tenia que entrar");
        loadUser();
      }else{
        console.log("Entra la publicación");
        loadPublication();
      }

      loadUserList(); 
    } // Cargar la lista de usuarios al inicializar

    const audioDescription = AuthService.getAudioDescription();
    // Leer el texto del usuario actual en voz alta al cargar la página
    if (audioDescription === "si") {
      const pageToSpeech = "You are in " + mode + "page";
      speakText(pageToSpeech);
    }
  }, [numPage]);

  // Función para leer el texto en voz alta
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en";
    window.speechSynthesis.speak(utterance);
  };

  const loadUser = async () => {
    try {
      const response = await UserService.getPerson(userId ?? 'NoID');
      setCurrentUser(response.data);
      console.log("Obtenemos los datos del otro usuario: exito");
    } catch (error) {
      navigate("*");
      console.log("Obtenemos los datos del otro usuario: mal");
      console.error(error);
    }
  };

  const loadPublication = async () => {
    try {
      const response = await PublicationService.getPublication(userId ?? 'NoID');
      setcurrentPublication(response.data);
      console.log("Obtenemos los datos del otro usuario: exito");
    } catch (error) {
      navigate("*");
      console.log("Obtenemos los datos del otro usuario: mal");
      console.error(error);
    }
  };


  const loadUserList = () => {
    if (isFollowersMode) {
      UserService.getFollowers(userId, numPage.toString())
      .then(response => {
        console.log(response);
        console.log(response.data);
        setUserList(prevUserList => [...prevUserList, ...response.data]);
      })
      .catch(error => {
        navigate("*");
      });
    } else if (isFollowingMode) {
      UserService.getFollowed(userId, numPage.toString())
      .then(response => {
        console.log(response);
        console.log(response.data);
        setUserList(prevUserList => [...prevUserList, ...response.data]);
      })
      .catch(error => {
        navigate("*");
      });
    } else if (isLikesMode) {
      PublicationService.getListLikes(userId, numPage.toString())
      .then(response => {
        console.log(response);
        console.log(response.data.likesPublication);
        setUserList(prevUserList => [...prevUserList, ...response.data.likesPublication]);
      })
      .catch(error => {
        navigate("*");
      });
    }
  };

  const handleLoadMore = () => {
    setNumPage(prevNumPage => prevNumPage + 1); // Aumentar el número de página al hacer clic en "Obtener más"
  };



  return (
    <div>
      <Navbar/>
      <div className="cardsUsers">
        <h1 className="usersTitle">{title}</h1>
        {userList.length > 0 ? (
          <ul>
            {userList.map((user: User) => (
              <li key={user.uuid}>
                <Link to={`/user/${user.uuid}`} className="user-link">
                  <div className="user">
                    {user.photoUser ? (
                      <img src={user.photoUser} alt={user.nameUser} className="user__profile-img" />
                    ) : (
                      <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                    )}
                    <div className="user__info">
                      <p className="user__name">{user.nameUser} {user.surnameUser}</p>
                      <p className="user__username">@{user.appUser}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="usersnotfound">{t("UNF")}</h1>
        )}
        {isFollowersMode ? (
          currentUser?.followersUser?.length !== undefined &&
          currentUser.followersUser.length > numPage * 2 ? (
            <button className="btnLoadMore" onClick={handleLoadMore}>
              {t("LoadMore")}
            </button>
          ) : (
            <button className="btnLoadMoreD" onClick={handleLoadMore} disabled>
              {t("LoadMore")}
            </button>
          )
        ) : isLikesMode ? (
          currentPublication?.likesPublication?.length !== undefined &&
          currentPublication.likesPublication.length > numPage * 2 ? (
            <button className="btnLoadMore" onClick={handleLoadMore}>
              {t("LoadMore")}
            </button>
          ) : (
            <button className="btnLoadMoreD" onClick={handleLoadMore} disabled>
              {t("LoadMore")}
            </button>
          )
        ) : (
          currentUser?.followedUser?.length !== undefined &&
          currentUser.followedUser.length > numPage * 2 ? (
            <button className="btnLoadMore" onClick={handleLoadMore}>
              {t("LoadMore")}
            </button>
          ) : (
            <button className="btnLoadMoreD" onClick={handleLoadMore} disabled>
              {t("LoadMore")}
            </button>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UsersList;


