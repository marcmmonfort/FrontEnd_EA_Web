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
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";


const CalendarEvents = () => {
  const [listActivities, setListActivities] = useState<ActivityEntity[]>([]);
  const [uuid, setUuid] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedTimetable, setSelectedTimetable] = useState("My Timetable");
  const [currentPage, setCurrentPage] = useState(1);
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
        }
      } catch (error) {
        navigate("*");
      }
    };
  
    fetchData();

  }, [selectedTimetable, currentPage]);

  const handleTimetableChange = (timetable: string) => {
    setSelectedTimetable(timetable);
  };

  const handlePageChange = (increment: number) => {
    setCurrentPage((prevPage) => prevPage + increment);
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
            My Plan
          </button>
          <button
            className={selectedTimetable === "Timetable Feed" ? "active" : ""}
            onClick={() => handleTimetableChange("Timetable Feed")}
          >
            Friends Plan
          </button>
          {currentUser && currentUser.followedUser &&selectedTimetable === "Timetable Feed" && currentUser.followedUser?.length > currentPage &&(
            <button
            className="nextPlan"
            onClick={() => handlePageChange(1)}
            >
              Next Plan
            </button>

          )}
        </div>
        <Calendar 
          activities={listActivities} uuid={uuid} showWeekButton={false} showDayButton={false} showMonthButton={false} showWeekChangeButtons={true} editable={selectedTimetable === "My Timetable"} selectedTimetable={selectedTimetable}/>
      </div>
      <Footer/>
    </div>
  );
};

export default CalendarEvents;
