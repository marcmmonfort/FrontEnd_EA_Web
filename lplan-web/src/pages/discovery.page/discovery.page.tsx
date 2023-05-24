import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_4.jpg';
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import _debounce from 'lodash/debounce';
import './discovery.page.css';
import { AuthService } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const Discovery = () => {

  const [userList, setUserList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  console.log("global:" + searchQuery);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    UserService.getUsers()
      .then(response => {
        console.log(response);
        console.log(response.data);
        setUserList(response.data);
      })
      .catch(error => {
        navigate("*");
      });
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log("He entrado en handleSearch");
    if (query.length > 0) {
      try {
        const response = await UserService.searchUsers(query);
        console.log(response);
        setUserList(response.data);
        console.log("He hecho el servicio");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await UserService.getUsers();
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const debouncedSearch = _debounce(handleSearch, 500);

  const currentUser = AuthService.getCurrentUser();
  console.log("usuario", currentUser);

  return (
    <div>
      <Navbar />
      <div className="titleContainer">
        <h1 className="titleSection">Discovery</h1>
        <input type="text" placeholder="Search Users" value={searchQuery} onChange={(event) => {
            setSearchQuery(event.target.value);
            debouncedSearch(event);
          }}
        />
      </div>
      <div className = "cardsUsers">
        {userList.length > 0 ? (
          <ul>
            {userList.map((user: User) => (
              <li key={user.uuid}>
                {currentUser === user.uuid ? (
                  <div className="user">
                    <Link to={`/profile`} className="user-link">
                      <div className="user">
                        {user.photoUser ? (<img src={user.photoUser} alt={user.nameUser} className="user__profile-img" />) : (
                          <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                        )}
                        <div className="user__info">
                        <p className="user__name">{user.nameUser} {user.surnameUser}</p>
                        <p className="user__username">@{user.appUser}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  ) : (
                  <Link to={`/user/${user.uuid}`} className="user-link">
                    <div className="user">
                      {user.photoUser ? (<img src={user.photoUser} alt={user.nameUser} className="user__profile-img" />) : (
                        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                      )}
                      <div className="user__info">
                        <p className="user__name">{user.nameUser} {user.surnameUser}</p>
                        <p className="user__username">@{user.appUser}</p>
                      </div>
                    </div>
                  </Link>
                )}              
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="usersnotfound">User Not Found</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Discovery;
