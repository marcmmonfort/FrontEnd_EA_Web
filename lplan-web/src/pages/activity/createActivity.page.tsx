import React, { useState } from "react";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input.component";
import Footer from "../../components/footer/footer";
import "./createActivity.page.css";
import { setDate } from "date-fns";
import { useTranslation } from 'react-i18next';

const CreateActivity = () => {
  const [activity, setActivity] = useState<ActivityEntity>({
    nameActivity: "",
    creatorActivity: "",
    participantsActivity: [],
    publicationActivity: [],
    dateActivity: new Date(),
    hoursActivity: [],
    descriptionActivity: "",
    privacyActivity: false,
    roleActivity: "",
  });

  const navigate = useNavigate();
  const {t}=useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

  
    
    
    
  
    if (name === "creatorActivity") {
      setActivity((prevActivity) => ({
        ...prevActivity,
        creatorActivity: value,
        participantsActivity: [value, ...(prevActivity.participantsActivity || [])],
      }));
    } else if (name === "hoursActivity") {
      const [startHour, endHour] = value.split(" - ");
      setActivity((prevActivity) => ({
        ...prevActivity,
        hoursActivity: [startHour, endHour],
      }));
    } else if (name === "dateActivity"){
      const dateValue =  new Date(value);
      setActivity((prevActivity) => ({ ...prevActivity, [name]: dateValue }));
    }
    
    else {
      setActivity((prevActivity) => ({
        ...prevActivity,
        [name]: value,
      }));
    }
  };
  

  
  
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dateActivity = new Date(activity.dateActivity);

    if (isNaN(dateActivity.getTime())) {
      console.error("Fecha de actividad inválida");
      return;
    }
    setActivity((prevActivity) => ({
      ...prevActivity,
      dateActivity,
    }));
    console.log(activity);

    ActivityService.createActivity(activity)
      .then((response) => {
        console.log(response);
        navigate("/calendarevents");
      })
      .catch((error) => {
        console.error(error);
        navigate("*");
      });
      
  };

  return (
    <div>
      <h1>{t("CreateActivity")}</h1>
      <form onSubmit={handleSubmit} className="scroll-container">
        <Input
          label="Nombre de la actividad"
          name="nameActivity"
          type="text"
          value={activity.nameActivity}
          onChange={handleInputChange}
        />
        <Input
          label="Creador de la actividad"
          name="creatorActivity"
          type="text"
          value={activity.creatorActivity}
          onChange={handleInputChange}
        />
        <Input
          label="Fecha de la actividad"
          name="dateActivity"
          type="date"
          value={new Date(activity.dateActivity).toISOString().substr(0, 10)} //new Date(user.birthdateUser).toISOString().substr(0, 10)
          onChange={handleInputChange}
        />
       <Input
            label="Horas de la actividad"
            name="hoursActivity"
            type="text"
            value={activity.hoursActivity.join(" - ")}
            onChange={handleInputChange}
        />
        <Input
          label="Descripción de la actividad"
          name="descriptionActivity"
          type="text"
          value={activity.descriptionActivity}
          onChange={handleInputChange}
        />
        <input
            type="checkbox"
            name="privacyActivity"
            checked={activity.privacyActivity}
            onChange={handleInputChange}
          />
        <Input
          label="Rol de la actividad"
          name="roleActivity"
          type="text"
          value={activity.roleActivity}
          onChange={handleInputChange}
        />
        <button type="submit">{t("Create")}</button>
      </form>
      <Footer/>
    </div>
  );
};

export default CreateActivity;
