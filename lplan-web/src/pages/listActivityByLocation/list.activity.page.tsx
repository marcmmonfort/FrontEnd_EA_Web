import React, { useEffect, useState } from "react";
import "./list.activity.page.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { EventClickArg } from "@fullcalendar/core";
import "./list.activity.page.css";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";
import { UserService } from "../../services/user.service";
import ActivityDetailsModal from "../../components/activityDetails/activity.component";
import { AuthService } from "../../services/auth.service";

const ActivitiesLocationList = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const [activities, setActivities] = useState<ActivityEntity[]>([]);
	const [userId, setUserId] = useState<string>("");
	const navigate = useNavigate();
	const location = useLocation();
	const uuid = location.state?.uuid;

	useEffect(() => {
		obtainActivitiesLocation();
	}, []);

	const obtainActivitiesLocation = async (): Promise<void> => {
		const id = AuthService.getCurrentUser();
		setUserId(id);
		if (uuid) {
			try {
				const response = await ActivityService.getActivitiesOfALocation(uuid);
				if (response && response.data) {
					const activities = response.data as ActivityEntity[];
					setActivities(activities);
				} else {
					console.error("Error fetching activities: Response is undefined");
				}
			} catch (error) {
				console.error("Error fetching activities:", error);
			}
		}
	};

	const getUserProfilePhoto = async (
		userId: string
	): Promise<string | null> => {
		try {
			const response = await UserService.getPerson(userId);
			if (response && response.data) {
				const user = response.data;
				return user.photoUser;
			} else {
				console.error("Error fetching user:", userId);
				return null;
			}
		} catch (error) {
			console.error("Error fetching user:", error);
			return null;
		}
	};

	const [userProfilePhotos, setUserProfilePhotos] = useState<
		Map<string, string[]>
	>(new Map());

	useEffect(() => {
		const audioDescription = AuthService.getAudioDescription();
		// Leer el texto del usuario actual en voz alta al cargar la página
		if (audioDescription === "si") {
			const pageToSpeech = "You are in discovery";
			speakText(pageToSpeech);
		}
		const fetchUserProfilePhotos = async (): Promise<void> => {
			const photos = new Map<string, string[]>();

			await Promise.all(
				activities.map(async (activity) => {
					if (activity.participantsActivity && activity.uuid) {
						const photosForActivity = await Promise.all(
							activity.participantsActivity.map((userId) =>
								getUserProfilePhoto(userId)
							)
						);

						const cleanedPhotosForActivity = photosForActivity.filter(
							(photo) => photo !== null
						) as string[];

						photos.set(activity.uuid, cleanedPhotosForActivity);
					}
				})
			);

			setUserProfilePhotos(photos);
		};

		fetchUserProfilePhotos();
	}, [activities]);

	// Función para leer el texto en voz alta
	const speakText = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en";
		window.speechSynthesis.speak(utterance);
	};

	const handleGoToScreenUser = (uuid: string): void => {
		navigate(`/user/${uuid}`);
	};

	const handleGoToActivity = (uuid: string): void => {
		navigate(`/activity/${uuid}`);
	};

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

	const closeActivityDetails = () => {
		setSelectedActivity(null);
		// setRecargar(prevState => !prevState);
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

	return (
		<div>
			<Navbar />
			<div className="activities-location-list">
				{activities.length > 0 ? (
					activities.map((activity) => (
						<div
							key={activity.uuid}
							className="activity-container"
							onClick={() => setSelectedActivity(activity)}
						>
							<h2 className="activity-name">{activity.nameActivity}</h2>
							<p className="activity-description">
								{activity.descriptionActivity}
							</p>
							<p className="activity-date">
								{new Date(activity.dateActivity).getDate()}.
								{new Date(activity.dateActivity).getMonth() + 1}.
								{new Date(activity.dateActivity).getFullYear()}
							</p>
							<p className="activity-time">
								{activity.hoursActivity[0]} - {activity.hoursActivity[1]}
							</p>
							<div className="scroll-profiles">
								{activity.uuid &&
									userProfilePhotos
										.get(activity.uuid)
										?.map((photoUrl, index) => (
											<div
												key={index}
												onClick={() => {
													const userId = activity.participantsActivity?.[index];
													if (userId) {
														handleGoToScreenUser(userId);
													}
												}}
											>
												<img
													className="participant-profile-image"
													src={photoUrl ? photoUrl : ""}
													alt=""
												/>
											</div>
										))}
							</div>
							{selectedActivity && (
								<ActivityDetailsModal
									activity={selectedActivity}
									onClose={closeActivityDetails}
									userId={userId}
									onAddToActivity={handleAddToActivity} // Pasa la función handleAddToActivity como prop
								/>
							)}
						</div>
					))
				) : (
					<div className="no-activities">
						<p className="no-activities-text">What a boring place!</p>
						<img
							className="shock-icon"
							src="https://cdn.shopify.com/s/files/1/1061/1924/products/12_large.png?v=1571606116"
							alt=""
						/>
						<Link to="/createActivity" className="buttonGoToCreateActivity">
							{" "}
							Create an Activity{" "}
						</Link>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ActivitiesLocationList;
