import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ActivityEntity } from "../../models/activity.model";
import { EventClickArg } from "@fullcalendar/core";
import ActivityDetailsModal from "../activityDetails/activity.component";

import "./calendar.component.css";

interface CalendarProps {
  activities: ActivityEntity[];
  uuid: string;
  showWeekButton: boolean;
  showDayButton: boolean;
  showMonthButton: boolean;
  showWeekChangeButtons: boolean;
  selectedTimetable: string;
  editable: boolean;
  showAllDay: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  activities,
  showWeekButton,
  showDayButton,
  showMonthButton,
  showWeekChangeButtons,
  selectedTimetable,
  showAllDay,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityEntity | null>(null);

  const handleEventClick = (event: EventClickArg) => {
    const clickedActivity = activities.find(
      (activity) => activity.uuid === event.event.id
    );
    if (clickedActivity) {
      setSelectedActivity(clickedActivity);
      console.log("clickedActivity", clickedActivity);
    }
  };

  const closeActivityDetails = () => {
    setSelectedActivity(null);
  };

  const getSlotLabelContent = (arg: any) => {
    if (!showAllDay && arg.isAllDay) {
      return "";
    }
    const hour = arg.date.getHours();
    return `${hour}:00`;
  };

  const adjustedActivities = activities.map((activity) => {
    const startHour = activity.hoursActivity[0];
    const endHour = activity.hoursActivity[1];
    const startDate = new Date(activity.dateActivity);
    startDate.setHours(parseInt(startHour), 0, 0);
    const endDate = new Date(activity.dateActivity);
    endDate.setHours(parseInt(endHour), 0, 0);

    return {
      id: activity.uuid,
      title: activity.nameActivity,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      allDay: false,
    };
  });

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={adjustedActivities}
        eventClick={handleEventClick}
        customButtons={{}}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: `${showMonthButton ? "dayGridMonth," : ""}${showWeekButton ? "timeGridWeek," : ""}${
            showDayButton ? "timeGridDay," : ""
          }`.slice(0, -1),
        }}
        dateClick={(arg) => {
          console.log(arg.date);
        }}
        weekends={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        expandRows={true}
        firstDay={1} // Establecer el inicio de la semana en lunes
        weekNumbers={showWeekChangeButtons} // Mostrar u ocultar los números de semana y los botones de cambio de semana
        slotLabelContent={getSlotLabelContent}
        editable={selectedTimetable === "My Timetable"}
      />
      {selectedActivity && (
        <ActivityDetailsModal activity={selectedActivity} onClose={closeActivityDetails} />
      )}
    </div>
  );
};

export default Calendar;
