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
}

const Calendar: React.FC<CalendarProps> = ({
  activities,
  showWeekButton,
  showDayButton,
  showMonthButton,
  showWeekChangeButtons,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityEntity | null>(null);

  const handleEventClick = (event: EventClickArg) => {
    const clickedActivity = activities.find(
      (activity) => activity.uuid === event.event.extendedProps.id
    );
    if (clickedActivity) {
      setSelectedActivity(clickedActivity);
    }
  };

  const closeActivityDetails = () => {
    setSelectedActivity(null);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={activities.map((activity) => ({
          id: activity.uuid,
          title: activity.nameActivity,
          start: activity.dateActivity,
          allDay: true,
        }))}
        eventClick={handleEventClick}
        customButtons={{}}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: `${showMonthButton ? "dayGridMonth," : ""}${
            showWeekButton ? "timeGridWeek," : ""
          }${showDayButton ? "timeGridDay," : ""}`.slice(0, -1),
        }}
        dateClick={(arg) => {
          console.log(arg.date);
        }}
        weekends={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        expandRows={true}
        firstDay={1} // Establecer el inicio de la semana en lunes
        weekNumbers={showWeekChangeButtons} // Mostrar u ocultar los números de semana y los botones de cambio de semana
      />
      {selectedActivity && (
        <ActivityDetailsModal activity={selectedActivity} onClose={closeActivityDetails} />
      )}
    </div>
  );
};

export default Calendar;
