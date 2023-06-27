import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";
import Calendar from "../../components/calendar/calendar.component";
import { SlotLabelContentArg } from "@fullcalendar/core";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AuthService } from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faSignOutAlt,
	faBell,
	faPlusCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import _debounce from "lodash/debounce";
import "./calendarevents.page.css";

// Fondo de pantalla personalizado ...
import backgroundImage from "../../assets/images/background_5.jpg";
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
	const [userList, setUserList] = useState<User[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		document.body.style.backgroundImage = `url(${backgroundImage})`;

		const isAudioDescription = AuthService.getAudioDescription();
		if (isAudioDescription === "si") {
			const pageToSpeech = "You are in calendar";
			speakText(pageToSpeech);
		}

		const userId = AuthService.getCurrentUser();
		setUuid(userId);

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		const date = currentDate.toString();

		const fetchData = async () => {
			try {
				const response = await UserService.getPerson(userId);
				const user = response.data;
				setCurrentUser(user);

				if (selectedTimetable === "My Timetable") {
					const myScheduleResponse = await ActivityService.getMySchedule(
						userId,
						date
					);
					setListActivities(myScheduleResponse.data);
				} else {
					const numPage = currentPage.toString();
					if (selectedUser && selectedUser.uuid) {
						const selectedUserActivities = await ActivityService.getMySchedule(
							selectedUser.uuid,
							date
						);
						setListActivities(selectedUserActivities.data);
						setCurrentPage(1);
					} else {
						const otherScheduleResponse =
							await ActivityService.getOtherSchedule(userId, numPage, date);
						setListActivities(otherScheduleResponse.data.activities);
						const response = await UserService.getPerson(
							otherScheduleResponse.data.uuid
						);
						const user = response.data;
						setOtherUser(user);
					}
				}
			} catch (error) {
				navigate("*");
			}
		};
		fetchData();
	}, [selectedTimetable, currentPage, recargar, selectedUser]);

	// Función para leer el texto en voz alta
	const speakText = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en";
		window.speechSynthesis.speak(utterance);
	};

	const handleTimetableChange = (timetable: string) => {
		setSelectedTimetable(timetable);
	};

	const handlePageChange = (increment: number) => {
		setCurrentPage((prevPage) => prevPage + increment);
	};

	const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;

		if (query.length > 0) {
			try {
				const response = await UserService.searchUsers(query);
				setUserList(response.data);
			} catch (error) {
				console.error(error);
			}
		} else {
			// Si la consulta está vacía, muestra todos los usuarios
			setUserList([]);
		}
	};

	const debouncedSearch = _debounce(handleSearch, 500);

	return (
		<div>
			<Navbar />
			<div className="titleContainer_Calendar">
				<h1 className="titleSection">{t("Calendar")}</h1>
			</div>

			<div className="contentContainer">
				<div className="schedule-buttons">
					<button
						className={selectedTimetable === "My Timetable" ? "active" : ""}
						onClick={() => {
							handleTimetableChange("My Timetable");
							setSelectedUser(null);
						}}
					>
						{t("Own")}
					</button>
					<button
						className={selectedTimetable === "Timetable Feed" ? "active" : ""}
						onClick={() => {
							handleTimetableChange("Timetable Feed");
							setSelectedUser(null);
						}}
					>
						{t("Friends")}
					</button>
				</div>
				<div className="buttonsCalendar">
					{selectedTimetable === "My Timetable" && (
						<Link to="/createActivity" className="new">
							<FontAwesomeIcon icon={faPlus} />
						</Link>
					)}
					{currentUser &&
						currentUser.followedUser &&
						selectedTimetable === "Timetable Feed" &&
						currentPage > 1 && (
							<button
								className="nextPlanButton"
								onClick={() => {
									handlePageChange(-1);
									setSelectedUser(null);
								}}
							>
								{t("Previous")}
							</button>
						)}
					{currentUser &&
						currentUser.followedUser &&
						selectedTimetable === "Timetable Feed" &&
						currentUser.followedUser?.length > currentPage && (
							<button
								className="nextPlanButton"
								onClick={() => {
									handlePageChange(1);
									setSelectedUser(null);
								}}
							>
								{t("Next")}
							</button>
						)}
				</div>
				{selectedTimetable === "My Timetable" && currentUser && (
					<div className="userCalendarContainer">
						<Link to={"/profile"} className="userLink">
							<div className="user_calendar">
								{currentUser.photoUser ? (
									<img
										src={currentUser.photoUser}
										alt={currentUser.nameUser}
										className="user_profile-img"
									/>
								) : (
									<img
										src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
										alt="profile-img"
										className="user_profile-img"
									/>
								)}
								<div className="user__info">
									<p className="user__ns">
										{currentUser.nameUser} {currentUser.surnameUser}
									</p>
									<p className="user__un">@{currentUser.appUser}</p>
								</div>
							</div>
						</Link>
					</div>
				)}
				{selectedTimetable === "Timetable Feed" && otherUser && (
					<>
						<div className="SearchContainer">
							<input
								type="text"
								className="SearchContainer"
								placeholder="Search Users"
								value={searchQuery}
								onChange={(event) => {
									setSearchQuery(event.target.value);
									debouncedSearch(event);
								}}
							/>
							<div className="cardsUsers-Calendar">
								{userList.length > 0 ? (
									<ul>
										{userList.map((user: User) => (
											<li key={user.uuid}>
												{
													<button
														className="user-link-Calendar"
														onClick={() => setSelectedUser(user)}
													>
														<div className="user">
															{user.photoUser ? (
																<img
																	src={user.photoUser}
																	alt={user.nameUser}
																	className="user__profile-img-Calendar"
																/>
															) : (
																<img
																	src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
																	alt="profile-img"
																	className="profile-img-card-Calendar"
																/>
															)}
															<div className="user__info-Calendar">
																<p className="user__name-Calendar">
																	{user.nameUser} {user.surnameUser}
																</p>
																<p className="user__username-Calendar">
																	@{user.appUser}
																</p>
															</div>
														</div>
													</button>
												}
											</li>
										))}
									</ul>
								) : (
									<h1 className="usersnotfound-Calendar">{t("UNF")}</h1>
								)}
							</div>
						</div>

						<div className="userCalendarContainer">
							{selectedUser ? (
								<Link to={`/user/${selectedUser?.uuid}`} className="userLink">
									<div className="user_calendar">
										{otherUser.photoUser ? (
											<img
												src={selectedUser.photoUser}
												alt={selectedUser.nameUser}
												className="user_profile-img"
											/>
										) : (
											<img
												src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
												alt="profile-img"
												className="user_profile-img"
											/>
										)}
										<div className="user__info">
											<p className="user__ns">
												{selectedUser.nameUser} {selectedUser.surnameUser}
											</p>
											<p className="user__un">@{selectedUser.appUser}</p>
										</div>
									</div>
								</Link>
							) : (
								<Link to={`/user/${otherUser?.uuid}`} className="userLink">
									<div className="user_calendar">
										{otherUser.photoUser ? (
											<img
												src={otherUser.photoUser}
												alt={otherUser.nameUser}
												className="user_profile-img"
											/>
										) : (
											<img
												src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
												alt="profile-img"
												className="user_profile-img"
											/>
										)}
										<div className="user__info">
											<p className="user__ns">
												{otherUser.nameUser} {otherUser.surnameUser}
											</p>
											<p className="user__un">@{otherUser.appUser}</p>
										</div>
									</div>
								</Link>
							)}
						</div>
					</>
				)}
				;
				<div className="calendar">
					<Calendar
						activities={listActivities}
						uuid={uuid}
						showWeekButton={false}
						showDayButton={false}
						showMonthButton={false}
						showWeekChangeButtons={true}
						editable={selectedTimetable === "My Timetable"}
						selectedTimetable={selectedTimetable}
						showAllDay={false}
						userId={currentUser?.uuid || ""}
						setRecargar={setRecargar}
						initialDate={new Date()}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CalendarEvents;
