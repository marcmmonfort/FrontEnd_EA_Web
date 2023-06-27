import React, { useEffect, useState } from "react";
import { ActivityEntity } from "../../models/activity.model";
import { useTranslation } from "react-i18next";
import "./activity.component.css";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Link } from "react-router-dom";
import ShareComponent from "../share/share.component";
import { RatingsService } from "../../services/ratings.service";
import { RatingsEntity } from "../../models/ratings.model";
import { ActivityService } from "../../services/activity.service";
import { AuthService } from "../../services/auth.service";

interface ActivityDetailsModalProps {
	activity: ActivityEntity;
	onClose: () => void;
	onAddToActivity: (isJoining: boolean) => void;
	userId: string;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
	activity,
	onClose,
	onAddToActivity,
	userId,
}) => {
	const { t } = useTranslation();
	const [participants, setParticipants] = useState(
		activity.participantsActivity || []
	);
	const [isCurrentUserParticipant, setIsCurrentUserParticipant] = useState(
		participants.includes(userId)
	);
	const [isCreatorOfActivity, setIsCreatorOfActivity] = useState(
		activity.creatorActivity.includes(userId)
	);
	const [creatorUser, setCreatorUser] = useState<User | null>(null);
	const [creatorAppName, setCreatorAppName] = useState<string>("");

	const [showSharePopup, setShowSharePopup] = useState(false);
	const [isShareClicked, setIsShareClicked] = useState(false);
	const [fotoParticipantes, setFotoParticipantes] = useState<User[] | null>(
		null
	);
	const [numPage, setNumPage] = useState<string>("1");
	const [id, setId] = useState<string>("1");

	useEffect(() => {
		const fetchCreatorAppName = async (uuid: string) => {
			try {
				const response = await UserService.getPerson(uuid);
				const user = response.data;
				setCreatorUser(user);
				setCreatorAppName(user.appUser || "");
			} catch (error) {
				console.error(error);
			}
		};
		fetchCreatorAppName(activity.creatorActivity);
		ratingsMechanism();
		handleFotoParticipants();
		setId(AuthService.getCurrentUser());
	}, [activity.creatorActivity, numPage]);

	const handleAddToActivity = (isJoining: boolean) => {
		setIsCurrentUserParticipant(!isCurrentUserParticipant);
		onAddToActivity(isJoining);
	};

	const showJoinButton = !isCreatorOfActivity;

	const handleFotoParticipants = async () => {
		const participantesAux = await ActivityService.getParticipants(
			activity.uuid,
			numPage
		);
		setFotoParticipantes(participantesAux.data);
	};

	//  - - - - - START of SHARING - - - - -

	const handleShare = () => {
		setShowSharePopup(true);
		setIsShareClicked(true);
	};

	const handleCloseSharePopup = () => {
		setShowSharePopup(false);
		setIsShareClicked(false);
	};

	//  - - - - - END of SHARING - - - - -

	// - - - - - START of RATINGS - - - - -

	const [allRatings, setAllRatings] = useState<RatingsEntity[] | null>(null);
	const [ratingAverage, setRatingAverage] = useState<number | null>(null);
	const [raters, setRaters] = useState<string[] | null>(null);
	const [rate, setRate] = useState<number | null>(1);
	const [currentRating, setCurrentRating] = useState<RatingsEntity | null>(
		null
	);
	const [currentRatingId, setCurrentRatingId] = useState<string | null>(null);
	const [currentRatingLength, setCurrentRatingLength] = useState<number | null>(
		null
	);

	const stars = Array.from(
		document.querySelectorAll(".stars_for_rating span[data-star]")
	) as HTMLElement[];

	stars.forEach((star) => {
		star.addEventListener("click", () => {
			const selectedStar = star.dataset.star;
			for (let i = 1; i <= parseInt(selectedStar!); i++) {
				const starElement = document.querySelector(
					`.stars_for_rating span[data-star="${i}"]`
				) as HTMLElement;
				if (starElement) {
					starElement.textContent = "★";
				}
			}
			for (let i = parseInt(selectedStar!) + 1; i <= 5; i++) {
				const starElement = document.querySelector(
					`.stars_for_rating span[data-star="${i}"]`
				) as HTMLElement;
				if (starElement) {
					starElement.textContent = "☆";
				}
			}
		});
	});

	const ratingsMechanism = async () => {
		try {
			const response = await RatingsService.getAllRatings();
			const listAllRatings = response.data;
			setAllRatings(listAllRatings);

			if (activity) {
				const activityId = activity.uuid;

				// Busco aquí si esta actividad ya ha sido votada antes por alguien ...
				const activityRating = listAllRatings.find(
					(rating: RatingsEntity) =>
						rating.idRatedObject === activityId &&
						rating.ratingType === "activities"
				);

				if (activityRating) {
					setCurrentRating(activityRating);
					setCurrentRatingId(activityRating.uuid);
					setCurrentRatingLength(activityRating.idRaters.length);
					setRatingAverage(activityRating.ratingAverage);
					setRaters(activityRating.idRaters);
				} else {
					console.error("There's no rating for this activity: ", activityId);
				}
			} else {
				console.error("No activity found.");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleStarClick = (event: React.MouseEvent<HTMLSpanElement>) => {
		const star = event.currentTarget;
		const selectedStar = star.dataset.star
			? parseInt(star.dataset.star, 10)
			: null;
		setRate(selectedStar);
	};

	const handleRating = async () => {
		// Si nunca se ha votado ...
		if (!raters && activity.uuid && rate) {
			try {
				const newRating: RatingsEntity = {
					ratingType: "activities",
					idRatedObject: activity.uuid,
					ratingAverage: rate,
					idRaters: [userId],
				};
				const response = await RatingsService.insertRating(newRating);
				onClose();
			} catch (error) {
				console.error(error);
			}
		} else if (
			raters &&
			currentRating &&
			ratingAverage &&
			currentRatingId &&
			currentRatingLength &&
			activity.uuid &&
			rate
		) {
			try {
				const oldRatingAverage = ratingAverage;
				const updatedRating: RatingsEntity = {
					uuid: currentRatingId,
					ratingType: "activities",
					idRatedObject: activity.uuid,
					ratingAverage:
						(oldRatingAverage * currentRatingLength + rate) /
						(currentRatingLength + 1),
					idRaters: [...(currentRating.idRaters || []), userId],
				};
				const response = await RatingsService.updateRating(
					currentRatingId,
					updatedRating
				);
				onClose();
			} catch (error) {
				console.error(error);
			}
		}
	};

	// - - - - - END of RATINGS - - - - -

	return (
		<div className="modal">
			<div className={`modal-content${isShareClicked ? " share-clicked" : ""}`}>
				<div className="titleContainer_Calendar">
					<h1 className="titleSection_modal">{t("ActivityDetails")}</h1>
				</div>
				<p className="AD_Title">{t("Name")}</p>
				<p className="AD_Text">{activity.nameActivity}</p>
				<p className="AD_Title">{t("Date")}</p>
				<p className="AD_Text">
					{new Date(activity.dateActivity).toISOString().substr(0, 10)}
				</p>
				<p className="AD_Title">{t("Description")}</p>
				<p className="AD_Text">{activity.descriptionActivity}</p>
				{creatorUser && (
					<Link to={`/user/${creatorUser.uuid}`} className="user-link-modal">
						<img
							className="post__profile-img-modal"
							src={`${creatorUser.photoUser}`}
							alt="Profile"
						/>
						<div className="post__info">
							<p className="post__username_header-modal">
								Created by @{creatorAppName}
							</p>
						</div>
					</Link>
				)}

				<h2 className="AD_Subtitle">Rating</h2>
				<h2 className="stars_amount">
					{ratingAverage ? `☆ ${ratingAverage.toFixed(2)}` : "Not Rated"}
				</h2>
				{raters && raters.includes(userId) ? (
					<div>
						<button className="rate_button_disabled" disabled={true}>
							Already Rated
						</button>
					</div>
				) : (
					<div>
						<h1 className="stars_for_rating">
							<span data-star={1} onClick={handleStarClick}>
								★
							</span>
							<span data-star={2} onClick={handleStarClick}>
								☆
							</span>
							<span data-star={3} onClick={handleStarClick}>
								☆
							</span>
							<span data-star={4} onClick={handleStarClick}>
								☆
							</span>
							<span data-star={5} onClick={handleStarClick}>
								☆
							</span>
						</h1>
						<button className="rate_button" onClick={handleRating}>
							Rate with {rate} ☆
						</button>
					</div>
				)}

				<h2 className="AD_Subtitle">Participants</h2>
				<div className="row_participants_activity">
					{fotoParticipantes &&
						fotoParticipantes.map((participant, index) => {
							if (id === participant.uuid) {
								return (
									<Link to={"/profile"} className="user-link" key={index}>
										<div>
											<img
												src={participant.photoUser}
												alt={participant.nameUser}
												className="user__profile-img-modal"
											/>
										</div>
									</Link>
								);
							} else {
								return (
									<Link
										to={`/user/${participant.uuid}`}
										className="user-link-modal"
										key={index}
									>
										<div>
											<img
												src={participant.photoUser}
												alt={participant.nameUser}
												className="user__profile-img-modal"
											/>
										</div>
									</Link>
								);
							}
						})}
				</div>

				<button onClick={onClose}>{t("Close")}</button>
				{showJoinButton && (
					<button
						onClick={() => handleAddToActivity(!isCurrentUserParticipant)}
					>
						{isCurrentUserParticipant ? "Leave Activity" : "Join Activity"}
					</button>
				)}

				{showSharePopup ? (
					<>
						<ShareComponent
							shareUrl={`https://www.lplan.es:443/shared/activity/${activity.uuid}`}
							handleShare={handleShare}
						/>
						<button onClick={handleCloseSharePopup}>Cerrar</button>
					</>
				) : (
					<button onClick={handleShare}>Compartir</button>
				)}
			</div>
		</div>
	);
};

export default ActivityDetailsModal;
