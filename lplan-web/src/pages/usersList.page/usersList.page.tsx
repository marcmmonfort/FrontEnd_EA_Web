import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Link, useNavigate, useParams } from "react-router-dom";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_4.jpg';
import './usersList.page.css';

const UsersList = () => {
  const { userId, mode } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [numPage, setNumPage] = useState(1); // Variable para el número de página
  const navigate = useNavigate();

  const isFollowersMode = mode === "followers";
  const title = isFollowersMode ? "Followers" : "Following";

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    if(userId){
        loadUserList();       
        loadUser();
        
    } // Cargar la lista de usuarios al inicializar

    // Actualizar la lista de usuarios cuando cambie la página
  }, [numPage]);

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


  const loadUserList = () => {
    // Obtener la lista de usuarios según el modo y el número de página
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
    } else {
      UserService.getFollowed(userId, numPage.toString())
        .then(response => {
          console.log(response);
          console.log(response.data);
          setUserList(prevUserList => [...prevUserList, ...response.data]);
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
      <Navbar />
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
          <h1 className="usersnotfound">User Not Found</h1>
        )}
        {isFollowersMode ? (
        currentUser?.followersUser?.length !== undefined &&
        currentUser.followersUser.length > numPage * 2 ? (
          <button className="btnLoadMore" onClick={handleLoadMore}>
            Load More
          </button>
        ) : (
          <button className="btnLoadMoreD" onClick={handleLoadMore} disabled>
            Load More
          </button>
        )
      ) : (
        currentUser?.followedUser?.length !== undefined &&
        currentUser.followedUser.length > numPage * 2 ? (
          <button className="btnLoadMore" onClick={handleLoadMore}>
            Load More
          </button>
        ) : (
          <button className="btnLoadMoreD" onClick={handleLoadMore} disabled>
            Load More
          </button>
        )
      )}
      </div>
      <Footer />
    </div>
  );
};

export default UsersList;


