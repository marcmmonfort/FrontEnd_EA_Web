import React from "react";
import { ActivityEntity } from "../../models/activity.model";

interface ActivityDetailsModalProps {
  activity: ActivityEntity;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
    activity,
    onClose,
  }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Detalles de la actividad</h2>
          <p>Nombre: {activity.nameActivity}</p>
          <p>Fecha: {activity.dateActivity.toLocaleDateString()}</p>
          <p>Descripción: {activity.descriptionActivity}</p>
          <p>Creador: {activity.creatorActivity}</p>
          <p>Participantes: {activity.participantsActivity?.join(", ")}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  };

export default ActivityDetailsModal;
