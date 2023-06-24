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
import { useTranslation } from "react-i18next"
import './user.page.css';
import { RatingsEntity } from "../../models/ratings.model";
import { RatingsService } from "../../services/ratings.service";

const UserProfile = () => {

  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [myId, setMyId] = useState("1234");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    const myUserId = AuthService.getCurrentUser();

    if (myUserId) {
      setMyId(myUserId);
      console.log("Obtenemos los datos del otro usuario");
      // Obtenemos el usuario que estamos mostrando
      getById();

      console.log("Pedimos la relacion que tenemos con ese user");
      //Obtenemos si es seguidor o no.
      getRelation(myUserId);
    }
  }, [userId]);

  useEffect(() => {
    ratingsMechanism();
  }, [hasRated, currentUser]);

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

  const getRelation = async (myUserId: string) => {

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
    if (isFollowing) {
      try {
        const response = await UserService.removeFollowed(myId, userId ?? 'NoID');
        console.log("Pedimos la relacion que tenemos con ese user:: exito");
        console.log(response);
        if (response) {
          setIsFollowing(false);
        }
        else {
          alert("Algo ha ido mal al borrar el followed")
        }

      } catch (error) {
        console.log("Pedimos la relacion que tenemos con ese user:: mal");
        navigate("*");
        console.error(error);
      }
    } else {
      try {
        const response = await UserService.addFollowed(myId, userId ?? 'NoID');
        console.log("Pedimos la relacion que tenemos con ese user:: exito");
        console.log(response);
        if (response) {
          setIsFollowing(true);
        }
        else {
          alert("Algo ha ido mal al añadir el followed")
        }
      } catch (error) {
        console.log("Pedimos la relacion que tenemos con ese user:: mal");
        navigate("*");
        console.error(error);
      }
    }
  };

  // - - - - - START of RATINGS - - - - - 

  const [allRatings, setAllRatings] = useState<RatingsEntity[] | null>(null);
  const [ratingAverage, setRatingAverage] = useState<number | null>(null);
  const [raters, setRaters] = useState<string[] | null>(null);
  const [rate, setRate] = useState<number | null>(0);
  const [currentRating, setCurrentRating] = useState<RatingsEntity | null>(null);
  const [currentRatingId, setCurrentRatingId] = useState<string | null>(null);
  const [currentRatingLength, setCurrentRatingLength] = useState<number | null>(null);

  useEffect(() => {
    const stars = Array.from(document.querySelectorAll('.stars_for_rating span[data-star]')) as HTMLElement[];

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const selectedStar = star.dataset.star;
        for (let i = 1; i <= parseInt(selectedStar!, 10); i++) {
          const starElement = document.querySelector(`.stars_for_rating span[data-star="${i}"]`) as HTMLElement;
          if (starElement) {
            starElement.textContent = '★';
          }
        }
        for (let i = parseInt(selectedStar!, 10) + 1; i <= 5; i++) {
          const starElement = document.querySelector(`.stars_for_rating span[data-star="${i}"]`) as HTMLElement;
          if (starElement) {
            starElement.textContent = '☆';
          }
        }
      });
    });
  }, []);

  const ratingsMechanism = async () => {
    try {
      const response = await RatingsService.getAllRatings();
      const listAllRatings = response.data;
      setAllRatings(listAllRatings);

      console.log("USUARIO RATED: " + JSON.stringify(currentUser));
      if (currentUser) {
        const ratedUserId = currentUser.uuid;

        // Busco aquí si esta actividad ya ha sido votada antes por alguien ...
        const userRating = listAllRatings.find(
          (rating: RatingsEntity) => rating.idRatedObject === ratedUserId && rating.ratingType === "users"
        );

        console.log("---> ¿Va a entrar?");
        if (userRating) {
          console.log("---> ENTRA");
          setCurrentRating(userRating);
          setCurrentRatingId(userRating.uuid);
          setCurrentRatingLength(userRating.idRaters.length);
          setRatingAverage(userRating.ratingAverage);
          setRaters(userRating.idRaters);
          console.log("Average Rating: ", ratingAverage);
          console.log("ID of the Raters: ", raters);
        } else {
          console.log("---> NO ENTRA");
          console.log("There's no rating for this user: ", ratedUserId);
        }
      } else {
        console.log("---> NO ENCUENTRA USUARIO.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const star = event.currentTarget;
    const selectedStar = star.dataset.star ? parseInt(star.dataset.star, 10) : null;
    setRate(selectedStar);
  };

  const handleRating = async () => {
    // Si nunca se ha votado ...
    console.log("---> RATINGS ---> Current User Id: " + currentUser?.uuid);
    if (!raters && currentUser?.uuid && myId && rate) {
      try {
        const newRating: RatingsEntity = {
          ratingType: "users",
          idRatedObject: currentUser.uuid,
          ratingAverage: rate,
          idRaters: [myId]
        };
        const response = await RatingsService.insertRating(newRating);
        console.log("---> RATINGS ---> ¡Llega aquí!");
      } catch (error) {
        console.log(error);
      }
    } else if (raters && currentRating && ratingAverage && currentRatingId && currentRatingLength && currentUser?.uuid && rate) {
      try {
        const oldRatingAverage = ratingAverage;
        const updatedRating: RatingsEntity = {
          uuid: currentRatingId,
          ratingType: "users",
          idRatedObject: currentUser.uuid,
          ratingAverage: (oldRatingAverage * currentRatingLength + rate) / (currentRatingLength + 1),
          idRaters: [...(currentRating.idRaters || []), myId]
        };
        const response = await RatingsService.updateRating(currentRatingId, updatedRating);
      } catch (error) {
        console.log(error);
      }
    }
    setHasRated(true);
  };

  // - - - - - END of RATINGS - - - - - 

  return (
    <div>
      <Navbar />
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
              <h1 className="profileTitle">{t("Followers")}</h1>
              <h1 className="profile-stat-count"><Link to={`/profile/userList/${currentUser.uuid}/followers`}>{currentUser.followersUser?.length}</Link></h1>
              <h1 className="profileTitle">{t("Following")}</h1>
              <h1 className="profile-stat-count"><Link to={`/profile/userList/${currentUser.uuid}/following`}>{currentUser.followedUser?.length}</Link></h1>
            </div>
            <div className="profile-bio">
              <h1 className="profileTitle">{t("Name")}</h1>
              <p><span className="profile-real-name">{currentUser.nameUser}</span></p>
              <h1 className="profileTitle">{t("Description")}</h1>
              <p>{currentUser.descriptionUser}</p>
            </div>
          </div>
        ) : (
          <p>{t("Loading")}</p>
        )}
        <div >
          <h2 className="stars_amount_user">{ratingAverage ? `☆ ${ratingAverage.toFixed(2)}` : `Not Rated`}</h2>
          {raters && raters.includes(myId) ? (
            <div>
              <button className="rate_button_user_disabled" disabled={true}>Already Rated</button>
            </div>
          ) : (
              <div>
                <div className="rating_container">
                  <div className="stars_for_rating">
                    <span data-star="1" onClick={handleStarClick}>☆</span>
                    <span data-star="2" onClick={handleStarClick}>☆</span>
                    <span data-star="3" onClick={handleStarClick}>☆</span>
                    <span data-star="4" onClick={handleStarClick}>☆</span>
                    <span data-star="5" onClick={handleStarClick}>☆</span>
                  </div>
                </div>
                <button className="rate_button_user" onClick={handleRating}>Rate</button>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
