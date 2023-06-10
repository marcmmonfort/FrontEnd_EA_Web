import React, { useState } from "react";
import { ActivityEntity } from "../../models/activity.model";
import "./activity.component.css"

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
          <p>Creador: {activity.creatorActivity}</p>
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
