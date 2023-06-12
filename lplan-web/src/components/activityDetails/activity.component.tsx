import React from "react";
import { ActivityEntity } from "../../models/activity.model";
import { useTranslation } from "react-i18next";
import "./activity.component.css"

interface ActivityDetailsModalProps {
  activity: ActivityEntity;
  onClose: () => void;
}
console.log("Entro al modal");
const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
    activity,    
    onClose,
  }) => {
    const { t } = useTranslation();
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{t("ActivityDetails")}</h2>
          <p>Nombre: {activity.nameActivity}</p>
          <p>Fecha: {new Date(activity.dateActivity).toISOString().substr(0, 10)}</p>
          <p>Descripción: {activity.descriptionActivity}</p>
          <p>Creador: {activity.creatorActivity}</p>
          <p>Participantes: {activity.participantsActivity?.join(", ")}</p>
          <button onClick={onClose}>{t("Close")}</button>
        </div>
      </div>
    );
  };

export default ActivityDetailsModal;
