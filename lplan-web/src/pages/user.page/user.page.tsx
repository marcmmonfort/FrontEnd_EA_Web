import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from '../../assets/images/background_4.jpg';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { FaUserCircle } from "react-icons/fa";
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import './user.page.css';

const UserProfile = () => {

  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [myId, setMyId] = useState("1234");
  const navigate = useNavigate();

  useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      const myUserId = AuthService.getCurrentUser();

      if(myUserId){
        setMyId(myUserId);
        console.log("Obtenemos los datos del otro usuario");
        //Obtenemos el usuario
        getById();

        console.log("Pedimos la relacion que tenemos con ese user");
        //Obtenemos si es seguidor o no.
        getRelation(myUserId);
      }

      
    }, [userId]);


    const getById = async () => {
        console.log("Obtenemos los datos del otro usuario:", userId);
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

    const getRelation = async (myUserId:string) => {
        
        console.log("Pedimos la relacion que tenemos con ese user:", myUserId);
        try {
            const response = await UserService.isFollowed(myUserId, userId ?? 'NoID');
            console.log("Pedimos la relacion que tenemos con ese user:: exito");
            console.log(response);
            setIsFollowing(response.data);
        } catch (error) {
            console.log("Pedimos la relacion que tenemos con ese user:: mal");
            navigate("*");
            console.error(error);
        }
    };

    const handleFollow = async () => {
        
        // Aquí implemento la lógica para seguir o dejar de seguir al usuario
        console.log("Este usuario es seguir tuyo?:" + isFollowing);
        if(isFollowing){
            try {
                const response = await UserService.removeFollowed(myId, userId ?? 'NoID');
                console.log("Pedimos la relacion que tenemos con ese user:: exito");
                console.log(response);
                if(response){
                    setIsFollowing(false);
                }
                else{
                    alert("Algo ha ido mal al borrar el followed")
                }
                
            } catch (error) {
                console.log("Pedimos la relacion que tenemos con ese user:: mal");
                navigate("*");
                console.error(error);
            }
        }else{
            try {
                const response = await UserService.addFollowed(myId, userId ?? 'NoID');
                console.log("Pedimos la relacion que tenemos con ese user:: exito");
                console.log(response);
                if(response){
                    setIsFollowing(true);
                }
                else{
                    alert("Algo ha ido mal al añadir el followed")
                }
            } catch (error) {
                console.log("Pedimos la relacion que tenemos con ese user:: mal");
                navigate("*");
                console.error(error);
            }
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="user-profile">
                {currentUser ? (
                    <div className="profile">
                        <h1 className="profile-user-name">{currentUser.appUser}</h1>
                        <div className="profile-image">{currentUser.photoUser ? (<img src={currentUser.photoUser} alt="profile-img" className="profile-img-card" />) : (
                            <FaUserCircle className="default-profile-img" />
                            )}
                        </div>
                        <button className={isFollowing ? "following-button" : "follow-button"} onClick={handleFollow}>
                                {isFollowing ? "Following" : "Follow"}
                            </button>
                        <div className="profile-stats">
                            <h1 className="profileTitle">Followers</h1>
                            <h1 className="profile-stat-count"><Link  to={`/profile/userList/${currentUser.uuid}/followers`}>{currentUser.followersUser?.length}</Link></h1>
                            <h1 className="profileTitle">Following</h1>
                            <h1 className="profile-stat-count"><Link  to={`/profile/userList/${currentUser.uuid}/following`}>{currentUser.followedUser?.length}</Link></h1>
                        </div>
                        <div className="profile-bio">
                            <h1 className="profileTitle">Name</h1>
                            <p><span className="profile-real-name">{currentUser.nameUser}</span></p>
                            <h1 className="profileTitle">Description</h1>
                            <p>{currentUser.descriptionUser}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading ...</p>
                )}
            </div>
            <Footer/>
        </div>
    );


};

export default UserProfile;