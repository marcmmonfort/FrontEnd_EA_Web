import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./profile.page.css";
import { useTranslation } from "react-i18next";
// Fondo de pantalla personalizado ...
import backgroundImage from "../../assets/images/background_7.jpg";
import { AuthService } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Publication } from "../../models/publication.model";
import { PublicationService } from "../../services/publication.service";
import Filter from "bad-words";
import ShareComponent from "../../components/share/share.component";
import { CircleLoader } from "react-spinners";
import { FaUser, FaShieldAlt, FaBuilding, FaCog } from "react-icons/fa";
import Calendar from "../../components/calendar/calendar.component";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";

document.body.style.backgroundImage = `url(${backgroundImage})`;

const Profile = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userId, setUserId] = useState<string>("hola");
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [listOwnPublications, setListOwnPublications] = useState<Publication[]>(
		[]
	);
	const [numPagePublication, setNumPagePublication] = useState<number>(1);
	const [numOwnPublications, setNumOwnPublications] = useState<number>(0);
	const [recargar, setRecargar] = useState<string>("");
	const [currentPublicationIndex, setCurrentPublicationIndex] = useState(1);
	const [showSharePopup, setShowSharePopup] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [icon, setIcon] = useState(<FaBuilding />);
	const [listActivities, setListActivities] = useState<ActivityEntity[]>([]);
	const [date, setDate] = useState<Date>(new Date());
	const [recargarCalendar, setRecargarCalendar] = useState(true);

	useEffect(() => {
		document.body.style.backgroundImage = `url(${backgroundImage})`;
		setTimeout(() => {
			const id = AuthService.getCurrentUser();
			if (id) {
				setUserId(id);
				UserService.getPerson(id)
					.then((response) => {
						if (response.data && response.data.descriptionUser) {
							const customFilter = new Filter({ regex: /\*|\.|$/gi });
							customFilter.addWords("idiota", "retrasado");

							const filteredDescription = customFilter.clean(
								response.data.descriptionUser
							);

							response.data.descriptionUser = filteredDescription;
							setCurrentUser(response.data);
							if (response.data.roleUser === "business") {
								setIcon(<FaBuilding />);
							} else if (response.data.roleUser === "admin") {
								setIcon(<FaCog />);
							} else if (response.data.roleUser === "verified") {
								setIcon(<FaShieldAlt />);
							} else {
								setIcon(<FaUser />);
							}
						}

						const audioDescription = AuthService.getAudioDescription();
						// Leer el texto del usuario actual en voz alta al cargar la página
						if (audioDescription === "si") {
							const pageToSpeech = "You are in your profile";
							speakText(pageToSpeech);
							setTimeout(() => {
								const appUserToSpeech = `appUser: ${response.data.appUser}`;
								speakText(appUserToSpeech);
							}, 500);
							setTimeout(() => {
								const followersUserToSpeech = `followed by: ${response.data.followersUser.length}`;
								speakText(followersUserToSpeech);
							}, 500);
							setTimeout(() => {
								const followingUserToSpeech = `following by: ${response.data.followedUser.length}`;
								speakText(followingUserToSpeech);
							}, 500);
							setTimeout(() => {
								const followingUserToSpeech = `user name: ${response.data.nameUser}`;
								speakText(followingUserToSpeech);
							}, 500);
							setTimeout(() => {
								const descriptionToSpeech = `description: ${response.data.descriptionUser}`;
								speakText(descriptionToSpeech);
							}, 500);
						}
					})
					.catch((error) => {
						navigate("*");
					});
			}

			if (userId) {
				PublicationService.obtainOwnPosts(id)
					.then((response) => {
						const publications = response.data;
						if (publications.length != 0) {
							const firstTransparentPublication = {
								...publications[0],
								photoPublication: [
									"https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png?20091205084734",
								],
							};
							const lastTransparentPublication = {
								...publications[0],
								photoPublication: [
									"https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png?20091205084734",
								],
							};
							// Publicación transparente al principio ...
							publications.unshift(firstTransparentPublication);
							// Publicación transparente al final ...
							publications.push(lastTransparentPublication);
						}

						setListOwnPublications(publications);
						setNumOwnPublications(publications.length);
					})
					.catch((error) => {
						navigate("*");
					});

				const currentDate = new Date();
				currentDate.setHours(0, 0, 0, 0);
				const dateAux = currentDate.toString();
				ActivityService.getMySchedule(id, dateAux)
					.then((response) => {
						setListActivities(response.data);
					})
					.catch((error) => {
						navigate("*");
					});
			}

			setIsLoading(false);
		}, 1000);
	}, [numPagePublication, recargar]);

	// Función para leer el texto en voz alta
	const speakText = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en";
		window.speechSynthesis.speak(utterance);
	};

	//Popup compartir
	const handleShare = () => {
		setShowSharePopup(true);
	};

	const handleCloseSharePopup = () => {
		setShowSharePopup(false);
	};

	const handleNextPublication = () => {
		setCurrentPublicationIndex((prevIndex) => {
			const newIndex = prevIndex + 1;
			if (newIndex >= numOwnPublications - 1) {
				return prevIndex;
			} else {
				return newIndex;
			}
		});
	};

	const handlePreviousPublication = () => {
		setCurrentPublicationIndex((prevIndex) => {
			const newIndex = prevIndex - 1;
			if (newIndex < 1) {
				return prevIndex;
			} else {
				return newIndex;
			}
		});
	};

	const currentPublication = listOwnPublications[currentPublicationIndex];
	const previousPublication = listOwnPublications[currentPublicationIndex - 1];
	const nextPublication = listOwnPublications[currentPublicationIndex + 1];

	const handlePreviousWeek = () => {
		setRecargarCalendar(false);
		setTimeout(() => {
			setDate((prevDate) => {
				const newDate = new Date(prevDate.getTime() - 7 * 24 * 60 * 60 * 1000);
				return newDate;
			});
			const currentDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
			currentDate.setHours(0, 0, 0, 0);
			const dateAux = currentDate.toString();
			ActivityService.getMySchedule(userId, dateAux)
				.then((response) => {
					setListActivities(response.data);
				})
				.catch((error) => {
					navigate("*");
				});
			setRecargarCalendar(true);
		}, 500);
	};

	const handleNextWeek = () => {
		setRecargarCalendar(false);
		setTimeout(() => {
			setDate((prevDate) => {
				const newDate = new Date(prevDate.getTime() + 7 * 24 * 60 * 60 * 1000);
				return newDate;
			});
			const currentDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
			currentDate.setHours(0, 0, 0, 0);
			const dateAux = currentDate.toString();
			ActivityService.getMySchedule(userId, dateAux)
				.then((response) => {
					setListActivities(response.data);
				})
				.catch((error) => {
					navigate("*");
				});
			setRecargarCalendar(true);
		}, 500);

		//setDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
	};

	return (
		<div>
			<Navbar />
			{isLoading ? (
				<div className="loaderContainer">
					<CircleLoader size="120" color="#66fcf1" loading={isLoading} />
				</div>
			) : (
				<div>
					<div className="titleContainer">
						<h1 className="titleSection">{t("Profile")}</h1>
					</div>
					{showSharePopup ? (
						<>
							<ShareComponent
								shareUrl={"https://www.lplan.es:443/shared/profile/" + userId}
								handleShare={handleShare}
							/>
							<button
								className="share_show_button"
								onClick={handleCloseSharePopup}
							>
								Close
							</button>
						</>
					) : (
						<button className="share_show_button" onClick={handleShare}>
							Share
						</button>
					)}
					<div className="profileContour">
						{currentUser && (
							<div className="profile-container">
								<div className="profile">
									<div className="userNameProfile">
										{icon && <div className="typeUserIcon">{icon}</div>}
										<h1 className="profile-user-name">{currentUser.appUser}</h1>
									</div>
									<div className="profile-image">
										<img
											src={currentUser.photoUser}
											alt="profile-img"
											className="profile-img-card"
										/>
									</div>
									<div className="profile-user-buttons">
										<Link to="/profile/edituser" className="buttonProfile">
											{t("EditProfile")}
										</Link>
										<Link to="/profile/settings" className="buttonProfile">
											{t("Settings")}
										</Link>
										<Link to="/stats" className="buttonProfile">
											{t("Stats")}
										</Link>
									</div>
									<div className="profile-stats">
										<h1 className="profileTitleFollowers">{t("Followers")}</h1>
										<h1 className="profile-stat-count">
											<Link to={`/profile/userList/${userId}/followers`}>
												{currentUser.followersUser?.length}
											</Link>
										</h1>
										<h1 className="profileTitle">{t("Following")}</h1>
										<h1 className="profile-stat-count">
											<Link to={`/profile/userList/${userId}/following`}>
												{currentUser.followedUser?.length}
											</Link>
										</h1>
									</div>
									<div className="profile-bio">
										<h1 className="profileTitle">{t("Name")}</h1>
										<p>
											<span className="profile-real-name">
												{currentUser.nameUser}
											</span>
										</p>
										<h1 className="profileTitle">{t("Description")}</h1>
										<p>{currentUser.descriptionUser}</p>
									</div>
									<div className="profile-album">
										<div className="feed">
											<div className="profile_post">
												<div className="new_profile_post">
													{currentPublication && (
														<div>
															<div className="row_pictures">
																<button
																	className="new_button"
																	onClick={handlePreviousPublication}
																	disabled={currentPublicationIndex === 1}
																>
																	<img
																		className="new_profile_post_image_L"
																		src={
																			previousPublication.photoPublication[0]
																		}
																	/>
																</button>
																<img
																	className="new_profile_post_image"
																	src={currentPublication.photoPublication[0]}
																/>
																<button
																	className="new_button"
																	onClick={handleNextPublication}
																	disabled={
																		currentPublicationIndex ===
																		listOwnPublications.length - 2
																	}
																>
																	<img
																		className="new_profile_post_image_R"
																		src={nextPublication.photoPublication[0]}
																	/>
																</button>
															</div>
															<p className="new_profile_post_text">
																{currentPublication.textPublication}
															</p>
															<p className="new_profile_post_time">
																{new Date(
																	currentPublication.createdAt
																).toLocaleString()}
															</p>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						<div className="calendar">
							<div className="calendar-nav">
								<button
									className="calendar-nav-button"
									onClick={handlePreviousWeek}
								>
									Previous Week
								</button>
								<button
									className="calendar-nav-button"
									onClick={handleNextWeek}
								>
									Next Week
								</button>
							</div>
							{recargarCalendar && (
								<Calendar
									activities={listActivities}
									uuid={userId}
									showWeekButton={false}
									showDayButton={false}
									showMonthButton={false}
									showWeekChangeButtons={true}
									editable={true}
									selectedTimetable={"My Timetable"}
									showAllDay={false}
									userId={currentUser?.uuid || ""}
									setRecargar={setRecargarCalendar}
									initialDate={date}
								/>
							)}
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Profile;
