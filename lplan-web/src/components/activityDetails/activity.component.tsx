import React, { useEffect, useState } from "react";
import { ActivityEntity } from "../../models/activity.model";
import "./activity.component.css"
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Link } from "react-router-dom";

interface ActivityDetailsModalProps {
  activity: ActivityEntity;
  onClose: () => void;
  onAddToActivity: (isJoining: boolean) => void;
  userId: string;
}
console.log("Entro al modal");
const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
    activity,    
    onClose,
    onAddToActivity,
    userId,
  }) => {
    const [participants, setParticipants] = useState(activity.participantsActivity || []);
    const [isCurrentUserParticipant, setIsCurrentUserParticipant] = useState(participants.includes(userId));
    const [isCreatorOfActivity, setIsCreatorOfActivity] = useState(activity.creatorActivity.includes(userId));
    const [creatorUser, setCreatorUser] = useState<User | null>(null);
    const [creatorAppName, setCreatorAppName] = useState<string>("");

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
  }, [activity.creatorActivity]);

    
    const handleAddToActivity = (isJoining: boolean) => {
      setIsCurrentUserParticipant(!isCurrentUserParticipant);
      onAddToActivity(isJoining);
    };

    const showJoinButton = !isCreatorOfActivity;


    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Detalles de la actividad</h2>
          <p>Nombre: {activity.nameActivity}</p>
          <p>Fecha: {new Date(activity.dateActivity).toISOString().substr(0, 10)}</p>
          <p>Descripción: {activity.descriptionActivity}</p>
          {creatorUser && (
            <Link to={`/user/${creatorUser.uuid}`} className="user-link">
              <div className="post__header">
                <img className="post__profile-img" src={`${creatorUser.photoUser}`} alt="Profile"/>
                  <div className="post__info">
                    <p className="post__username_header">Creador: {creatorAppName}</p>
                  </div>
              </div>
            </Link>
            )
          }

          <p>Participantes: {activity.participantsActivity?.join(", ")}</p>
          <button onClick={onClose}>Cerrar</button>
          {showJoinButton && (
          <button onClick={() => handleAddToActivity(!isCurrentUserParticipant)}>
            {isCurrentUserParticipant ? "Leave Activity" : "Join Activity"}
          </button>
        )}
        </div>
      </div>
    );
  };

export default ActivityDetailsModal;
