import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ActivityEntity } from "../../models/activity.model";
import { EventClickArg } from "@fullcalendar/core";
import ActivityDetailsModal from "../activityDetails/activity.component";

import "./calendar.component.css";
import { ActivityService } from "../../services/activity.service";

interface CalendarProps {
	activities: ActivityEntity[];
	uuid?: string;
	showWeekButton: boolean;
	showDayButton: boolean;
	showMonthButton: boolean;
	showWeekChangeButtons: boolean;
	selectedTimetable: string;
	editable: boolean;
	showAllDay: boolean;
	userId: string; // ID del usuario actual
	setRecargar: React.Dispatch<React.SetStateAction<boolean>>;
	initialDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({
	activities,
	showWeekButton,
	showDayButton,
	showMonthButton,
	showWeekChangeButtons,
	selectedTimetable,
	showAllDay,
	userId,
	setRecargar,
	initialDate,
}) => {
	const [selectedActivity, setSelectedActivity] =
		useState<ActivityEntity | null>(null);

	const handleEventClick = (event: EventClickArg) => {
		const clickedActivity = activities.find(
			(activity) => activity.uuid === event.event.id
		);
		if (clickedActivity) {
			setSelectedActivity(clickedActivity);
		} else {
			setSelectedActivity(null);
		}
	};

	const handleAddToActivity = (isJoining: boolean) => {
		if (selectedActivity) {
			const activityIndex = activities.findIndex(
				(activity) => activity.uuid === selectedActivity.uuid
			);
			if (activityIndex !== -1 && selectedActivity.uuid) {
				const updatedActivity = [...activities];
				const activityToUpdate = updatedActivity[activityIndex];

				if (isJoining) {
					activityToUpdate.participantsActivity = [
						...activityToUpdate.participantsActivity,
						userId,
					];
				} else {
					activityToUpdate.participantsActivity =
						activityToUpdate.participantsActivity.filter(
							(participantId) => participantId !== userId
						);
				}

				setSelectedActivity(activityToUpdate);
				ActivityService.updateActivity(selectedActivity.uuid, activityToUpdate);
			}
		}
	};

	const closeActivityDetails = () => {
		setSelectedActivity(null);
		setRecargar((prevState) => !prevState);
	};

	const getSlotLabelContent = (arg: any) => {
		if (!showAllDay && arg.isAllDay) {
			return "";
		}
		const hour = arg.date.getHours();
		return `${hour}:00`;
	};

	const adjustedActivities = activities.map((activity) => {
		const startHourParts = activity.hoursActivity[0].split(":");
		const endHourParts = activity.hoursActivity[1].split(":");
		const startHour = parseInt(startHourParts[0]);
		const startMinute = parseInt(startHourParts[1]);
		const endHour = parseInt(endHourParts[0]);
		const endMinute = parseInt(endHourParts[1]);
		const startDate = new Date(activity.dateActivity);
		startDate.setHours(startHour, startMinute, 0, 0);
		const endDate = new Date(activity.dateActivity);
		endDate.setHours(endHour, endMinute, 0, 0);

		let color;
		if (activity.roleActivity === "verificado") {
			color = "#cc1e4a"; // Color para el rol "verificado"
		} else if (activity.roleActivity === "common") {
			color = "#004c6c"; // Color para el rol "common"
		} else if (activity.roleActivity === "empresa") {
			color = "#121f45"; // Color para el rol "empresa"
		} else {
			color = "#202a2f"; // Color predeterminado para otros roles no especificados
		}

		return {
			id: activity.uuid,
			title: activity.nameActivity,
			start: startDate.toISOString(),
			end: endDate.toISOString(),
			allDay: false,
			color: color,
		};
	});

	return (
		<div className="calendar-container">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="timeGridWeek"
				events={adjustedActivities}
				eventClick={handleEventClick}
				initialDate={initialDate}
				customButtons={{}}
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: `${showMonthButton ? "dayGridMonth," : ""}${
						showWeekButton ? "timeGridWeek," : ""
					}${showDayButton ? "timeGridDay," : ""}`.slice(0, -1),
				}}
				dateClick={(arg) => {
					console.warn(arg.date);
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
				<ActivityDetailsModal
					activity={selectedActivity}
					onClose={closeActivityDetails}
					userId={userId}
					onAddToActivity={handleAddToActivity} // Pasa la función handleAddToActivity como prop
				/>
			)}
		</div>
	);
};

export default Calendar;
