import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Calendar from "../../components/calendar/calendar.component";
import { SlotLabelContentArg } from "@fullcalendar/core";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; 
import { AuthService } from "../../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBell, faPlusCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import "./calendarevents.page.css"


// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_5.jpg';
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";


const CalendarEvents = () => {
  const [listActivities, setListActivities] = useState<ActivityEntity[]>([]);
  const [uuid, setUuid] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [selectedTimetable, setSelectedTimetable] = useState("My Timetable");
  const [currentPage, setCurrentPage] = useState(1);
  const [recargar, setRecargar] = useState(false);
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
    
    const fetchData = async () => {
      try {
        const response = await UserService.getPerson(userId);
        const user = response.data;
        setCurrentUser(user);
  
        if (selectedTimetable === "My Timetable") {
          console.log("My horario");
          const myScheduleResponse = await ActivityService.getMySchedule(userId, date);
          console.log(myScheduleResponse);
          console.log(myScheduleResponse.data);
          setListActivities(myScheduleResponse.data);
        } else {
          console.log("Feed de horarios de seguidores");
          console.log("Page", currentPage);
          const numPage = currentPage.toString();
          const otherScheduleResponse = await ActivityService.getOtherSchedule(userId, numPage, date);
          console.log(otherScheduleResponse);
          console.log(otherScheduleResponse.data);
          setListActivities(otherScheduleResponse.data.activities);
          const response = await UserService.getPerson(otherScheduleResponse.data.uuid);
          const user = response.data;
          setOtherUser(user);
        }
      } catch (error) {
        navigate("*");
      }
    };
  
    fetchData();

  }, [selectedTimetable, currentPage, recargar]);

  const handleTimetableChange = (timetable: string) => {
    setSelectedTimetable(timetable);
  };

  const handlePageChange = (increment: number) => {
    setCurrentPage((prevPage) => prevPage + increment);
  };

  return (
    <div>
      <Navbar/>
      <div className="titleContainer_Calendar">
        <h1 className="titleSection">Calendar</h1>
      </div>
      <div className="contentContainer">
        <div className="schedule-buttons">
          <button className={selectedTimetable === "My Timetable" ? "active" : ""} onClick={() => handleTimetableChange("My Timetable")}>Own</button>
          <button className={selectedTimetable === "Timetable Feed" ? "active" : ""} onClick={() => handleTimetableChange("Timetable Feed")}>Friends</button>
        </div>
        <div className="buttonsCalendar">
          {selectedTimetable === "My Timetable" &&(
            <Link to="/createActivity" className="new">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          )}
          {currentUser && currentUser.followedUser && selectedTimetable === "Timetable Feed" && currentPage > 1  &&(
              <button className="nextPlanButton" onClick={() => handlePageChange(-1)}>Previous</button>
          )}
          {currentUser && currentUser.followedUser && selectedTimetable === "Timetable Feed" && currentUser.followedUser?.length > currentPage &&(
              <button className="nextPlanButton" onClick={() => handlePageChange(1)}>Next</button>
          )}
        </div>
        {selectedTimetable === "My Timetable" && currentUser && (
          <div className="userCalendarContainer">
            <Link to={`/profile`} className="userLink">
              <div className="user_calendar">
                {currentUser.photoUser ? (
                  <img src={currentUser.photoUser} alt={currentUser.nameUser} className="user_profile-img"/>
                ) : (
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="user_profile-img"/>
                )}
                <div className="user__info">
                  <p className="user__ns">{currentUser.nameUser} {currentUser.surnameUser}</p>
                  <p className="user__un">@{currentUser.appUser}</p>
                </div>
              </div>
            </Link>
          </div>
        )}{selectedTimetable === "Timetable Feed" && otherUser && (
          <div className="userCalendarContainer">
            <Link to={`/user/${otherUser?.uuid}`} className="userLink">
              <div className="user_calendar">
                {otherUser.photoUser ? (
                  <img src={otherUser.photoUser} alt={otherUser.nameUser} className="user_profile-img"/>
                ) : (
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="user_profile-img"/>
                )}
                <div className="user__info">
                  <p className="user__ns">{otherUser.nameUser} {otherUser.surnameUser}</p>
                  <p className="user__un">@{otherUser.appUser}</p>
                </div>
              </div>
            </Link>
          </div>
        )};
        <div className="calendar">
          <Calendar activities={listActivities} uuid={uuid} showWeekButton={false} showDayButton={false} showMonthButton={false} showWeekChangeButtons={true} editable={selectedTimetable === "My Timetable"} selectedTimetable={selectedTimetable} showAllDay={false} userId={currentUser?.uuid || ""} recargar={recargar} setRecargar={setRecargar}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CalendarEvents;
