import React, { useEffect, useState } from "react";
import { ActivityEntity } from "../../models/activity.model";
import { useTranslation } from "react-i18next";
import "./activity.component.css"
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Link } from "react-router-dom";
import ShareComponent from "../share/share.component";
import { RatingsService } from "../../services/ratings.service";
import { RatingsEntity } from "../../models/ratings.model";

interface ActivityDetailsModalProps {
  activity: ActivityEntity;
  onClose: () => void;
  onAddToActivity: (isJoining: boolean) => void;
  userId: string;
}

console.log("(1) Entro al Modal.");

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activity, onClose, onAddToActivity, userId}) => {
    const { t } = useTranslation();
    const [participants, setParticipants] = useState(activity.participantsActivity || []);
    const [isCurrentUserParticipant, setIsCurrentUserParticipant] = useState(participants.includes(userId));
    const [isCreatorOfActivity, setIsCreatorOfActivity] = useState(activity.creatorActivity.includes(userId));
    const [creatorUser, setCreatorUser] = useState<User | null>(null);
    const [creatorAppName, setCreatorAppName] = useState<string>("");
    const [showSharePopup, setShowSharePopup] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);

  useEffect(() => {
    const fetchCreatorAppName = async (uuid: string) => {
      try {
        const response = await UserService.getPerson(uuid);
        const user = response.data;
        setCreatorUser(user);
        setCreatorAppName(user.appUser || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreatorAppName(activity.creatorActivity);
    ratingsMechanism();
  }, [activity.creatorActivity]);
    
  const handleAddToActivity = (isJoining: boolean) => {
    setIsCurrentUserParticipant(!isCurrentUserParticipant);
    onAddToActivity(isJoining);
  };

  const showJoinButton = !isCreatorOfActivity;

  //  - - - - - Mínimo 2 (by Victor) - - - - - 

  const handleShare = () => {
    setShowSharePopup(true);
    setIsShareClicked(true); 
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
    setIsShareClicked(false); 
  };

  //  - - - - - Mínimo 2 (by Marc) - - - - - 

  const [allRatings, setAllRatings] = useState<RatingsEntity[] | null>(null);
  const [ratingAverage, setRatingAverage] = useState<number | null>(null);
  const [raters, setRaters] = useState<string[] | null>(null);
  const [rate, setRate] = useState<number | null>(0);
  const [currentRating, setCurrentRating] = useState<RatingsEntity | null>(null);
  const [currentRatingId, setCurrentRatingId] = useState<string | null>(null);
  const [currentRatingLength, setCurrentRatingLength] = useState<number | null>(null);

  const stars = Array.from(document.querySelectorAll('.stars_for_rating span[data-star]')) as HTMLElement[];

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const selectedStar = star.dataset.star;
      for (let i = 1; i <= parseInt(selectedStar!); i++) {
        const starElement = document.querySelector(`.stars_for_rating span[data-star="${i}"]`) as HTMLElement;
        if (starElement) {
          starElement.textContent = '★';
        }
      }
      for (let i = parseInt(selectedStar!) + 1; i <= 5; i++) {
        const starElement = document.querySelector(`.stars_for_rating span[data-star="${i}"]`) as HTMLElement;
        if (starElement) {
          starElement.textContent = '☆';
        }
      }
    });
  });

  const ratingsMechanism = async () => {
    try {
      const response = await RatingsService.getAllRatings();
      const listAllRatings = response.data;
      setAllRatings(listAllRatings);
  
      if (activity) {
        const activityId = activity.uuid;
  
        // Busco aquí si esta actividad ya ha sido votada antes por alguien ...
        const activityRating = listAllRatings.find(
          (rating: RatingsEntity) => rating.idRatedObject === activityId && rating.ratingType === "activities"
        );
  
        if (activityRating) {
          setCurrentRating(activityRating);
          setCurrentRatingId(activityRating.uuid);
          setCurrentRatingLength(activityRating.idRaters.length);
          setRatingAverage(activityRating.ratingAverage);
          setRaters(activityRating.idRaters);
          console.log("Average Rating: ", ratingAverage);
          console.log("ID of the Raters: ", raters);
        } else {
          console.log("There's no rating for this activity: ", activityId);
        }
      } else {
        console.log("No activity found.");
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
    if (!raters && activity.uuid && rate){
      try {
        const newRating: RatingsEntity = {
          ratingType: "activities",
          idRatedObject: activity.uuid,
          ratingAverage: rate,
          idRaters: [userId]
        };
        const response = await RatingsService.insertRating(newRating);
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else if (raters && currentRating && ratingAverage && currentRatingId && currentRatingLength && activity.uuid && rate){
      try {
        const oldRatingAverage = ratingAverage;
        const updatedRating: RatingsEntity = {
          uuid: currentRatingId,
          ratingType: "activities",
          idRatedObject: activity.uuid,
          ratingAverage: (oldRatingAverage*currentRatingLength + rate)/(currentRatingLength + 1),
          idRaters: [...(currentRating.idRaters || []), userId]
        };
        const response = await RatingsService.updateRating(currentRatingId, updatedRating);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //  - - - - - Mínimo 2 (by Marc) - - - - - 

  return (
    <div className="modal">
      <div className={`modal-content${isShareClicked ? ' share-clicked' : ''}`}>
        <h2>{t("ActivityDetails")}</h2>
        <p>{t("Name")}: {activity.nameActivity}</p>
        <p>{t("Date")}: {new Date(activity.dateActivity).toISOString().substr(0, 10)}</p>
        <p>{t("Description")}: {activity.descriptionActivity}</p>
        {creatorUser && (
          <Link to={`/user/${creatorUser.uuid}`} className="user-link">
            <div className="post__header">
              <img className="post__profile-img" src={`${creatorUser.photoUser}`} alt="Profile"/>
                <div className="post__info">
                  <p className="post__username_header">{t("Creator")}: {creatorAppName}</p>
                </div>
            </div>
          </Link>
          )
        }

        <h2>Valoració</h2>
        <h2 className="stars_amount">{ratingAverage ? `☆ ${ratingAverage}` : `Not Rated`}</h2>
        {raters && raters.includes(userId) ? (
          <div>
            <button className="rate_button_disabled" disabled={true}>Already Rated</button>
          </div>
        ) : (
          <div>
            <h1 className="stars_for_rating">
              <span data-star={1} onClick={handleStarClick}>☆</span>
              <span data-star={2} onClick={handleStarClick}>☆</span>
              <span data-star={3} onClick={handleStarClick}>☆</span>
              <span data-star={4} onClick={handleStarClick}>☆</span>
              <span data-star={5} onClick={handleStarClick}>☆</span>
            </h1>
            <button className="rate_button" onClick={handleRating}>Rate with {rate} ☆</button>
          </div>
        )}

        <p>Participantes: {activity.participantsActivity?.join(", ")}</p>
        <button onClick={onClose}>
          {t("Close")}
        </button>
        {showJoinButton && (
          <button onClick={() => handleAddToActivity(!isCurrentUserParticipant)}>
            {isCurrentUserParticipant ? "Leave Activity" : "Join Activity"}
          </button>
        )}

        {showSharePopup ? (
          <>
            <ShareComponent shareUrl={`http://localhost:3001/shared/activity/${activity.uuid}`} handleShare={handleShare} />
            <button onClick={handleCloseSharePopup}>
              Cerrar
            </button>
          </>
        ) : (
          <button onClick={handleShare}>
            Compartir
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityDetailsModal;