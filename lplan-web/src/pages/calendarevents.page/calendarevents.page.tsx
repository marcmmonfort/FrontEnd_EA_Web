import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Calendar from "../../components/calendar/calendar.component";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; 
import { AuthService } from "../../services/auth.service";


// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_5.jpg';


const CalendarEvents = () => {
  const [listActivities, setListActivities] = useState<ActivityEntity[]>([]);
  const [uuid, setUuid] = useState<string>("");
  const [selectedTimetable, setSelectedTimetable] = useState("My Timetable");
  const navigate = useNavigate();


  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;

    const userId = AuthService.getCurrentUser();
    setUuid(userId);
    const currentDate = new Date;
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate);
    const date = currentDate.toString();
    console.log("currentDate", date);
    if(selectedTimetable === "My Timetable"){
      console.log("My horario");
      ActivityService.getMySchedule(userId, date)
      .then(response => {
        console.log(response);
        console.log(response.data);
        setListActivities(response.data);
      })
      .catch(error => {
        navigate("*");
      });
    }else{
      console.log("Feed de horarios de seguidores");
      const numPage = 1;
      const page = numPage.toString()
      ActivityService.getOtherSchedule(userId, page ,date)
      .then(response => {
        console.log(response);
        console.log(response.data);
        setListActivities(response.data.activities);
      })
      .catch(error => {
        navigate("*");
      });
    }

  }, [selectedTimetable]);

  const handleTimetableChange = (timetable: string) => {
    setSelectedTimetable(timetable);
  };

  return (
    <div>
      <Navbar/>
      <div className="titleContainer">
        <h1 className="titleSection">Calendar + Events</h1>
        <Link to="/createActivity" className="create-activity-link">
          <FaPlus />
        </Link>
        <div className="schedule-buttons">
          <button
            className={selectedTimetable === "My Timetable" ? "active" : ""}
            onClick={() => handleTimetableChange("My Timetable")}
          >
            My Timetable
          </button>
          <button
            className={selectedTimetable === "Timetable Feed" ? "active" : ""}
            onClick={() => handleTimetableChange("Timetable Feed")}
          >
            Timetable Feed
          </button>
        </div>
        <Calendar activities={listActivities} uuid={uuid} showWeekButton={false} showDayButton={false} showMonthButton={false} showWeekChangeButtons={true} />
      </div>
      <Footer/>
    </div>
  );
};

export default CalendarEvents;
