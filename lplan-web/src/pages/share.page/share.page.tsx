import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../assets/images/background_4.jpg";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { FaUserCircle } from "react-icons/fa";
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import "./share.page.css";
import { ActivityService } from "../../services/activity.service";
import { ActivityEntity, ActivityShare } from "../../models/activity.model";
import { useTranslation } from "react-i18next";

const SharedContentPage = () => {
	const { type, id } = useParams();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [currentActivity, setCurrentActivity] = useState<ActivityShare | null>(
		null
	);
	const [isFollowing, setIsFollowing] = useState(false);
	const [myId, setMyId] = useState("1234");
	const [myType, setMyType] = useState("");
	const [isCurrentUserParticipant, setIsCurrentUserParticipant] = useState(
		currentActivity?.participantsActivity.includes(myId)
	);
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		document.body.style.backgroundImage = `url(${backgroundImage})`;

		const myUserId = AuthService.getCurrentUser();

		if (type) {
			setMyType(type);
		}

		if (type === "profile") {
			if (myUserId) {
				setMyId(myUserId);

				//Obtenemos el usuario
				getById();

				//Obtenemos si es seguidor o no.
				getRelation(myUserId);
			}
		} else if (type === "activity" && id) {
			getActivity(id);
		}
	}, [id]);

	//Funciones del perfil
	const getById = async () => {
		try {
			const response = await UserService.getPerson(id ?? "NoID");
			setCurrentUser(response.data);
		} catch (error) {
			navigate("*");

			console.error(error);
		}
	};

	const getRelation = async (myUserId: string) => {
		try {
			const response = await UserService.isFollowed(myUserId, id ?? "NoID");
			//console.log("Pedimos la relación que tenemos con ese usuario: éxito");
			//console.log(response);
			setIsFollowing(response.data);
		} catch (error) {
			//console.log("Pedimos la relación que tenemos con ese usuario: error");
			navigate("*");
			console.error(error);
		}
	};

	const handleFollow = async () => {
		// Aquí implemento la lógica para seguir o dejar de seguir al usuario
		//console.log("¿Este usuario es tu seguidor?:" + isFollowing);
		if (isFollowing) {
			try {
				const response = await UserService.removeFollowed(myId, id ?? "NoID");

				if (response) {
					setIsFollowing(false);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const response = await UserService.addFollowed(myId, id ?? "NoID");

				if (response) {
					setIsFollowing(true);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	const getActivity = async (activityId: string) => {
		ActivityService.getActivity(activityId)
			.then((response) => {
				setCurrentActivity(response.data);
			})
			.catch((error) => {
				navigate("*");
			});
	};

	const handleAddToActivity = (isJoining: boolean) => {
		setIsCurrentUserParticipant(!isCurrentUserParticipant);
		//onAddToActivity(isJoining);
	};

	/*
  const onAddToActivity = (isJoining: boolean) => {
    console.log("handleAddToActivity");
    if (currentActivity) {
      console.log(currentActivity.uuid);
      const activityShare = currentActivity;
      let activityEntity: ActivityEntity;
      if (activityShare.creatorActivity && activityShare.creatorActivity.uuid) {
        activityEntity = {
          ...activityShare,
          creatorActivity: {
            uuid: activityShare.creatorActivity.uuid
          }
        };
      }
      if (isJoining) {
        activityEntity.participantsActivity = [...activityEntity.participantsActivity, myId];
        console.log("Joined Activity");
      } else {
        activityEntity.participantsActivity = activityEntity.participantsActivity.filter(
        (participantId) => participantId !== myId
        );
        console.log("Left Activity");
      }
      setCurrentActivity(currentActivity);
      if(currentActivity.uuid){
        ActivityService.updateActivity(currentActivity.uuid, activityEntity);
      }
      
  
    
        
      
    }
  };
  */

	return (
		<div>
			<Navbar />
			<div className="header">
				{myType === "profile" && currentUser && (
					<div>
						<h2>{t("ProfileDetails")}</h2>
						<p>
							{t("Name")}: {currentUser.nameUser}
						</p>
						<p>
							{t("Email")}: {currentUser.mailUser}
						</p>
						<p>
							{t("Username")}: {currentUser.appUser}
						</p>
						<p>
							{t("Bio")}: {currentUser.descriptionUser}
						</p>
						<button onClick={handleFollow}>
							{isFollowing ? t("Unfollow") : t("Follow")}
						</button>
					</div>
				)}
				{myType === "activity" && currentActivity && (
					<div>
						<h2>{t("ActivityDetails")}</h2>
						<p>
							{t("Name")}: {currentActivity.nameActivity}
						</p>
						<p>
							{t("Date")}:{" "}
							{new Date(currentActivity.dateActivity)
								.toISOString()
								.substr(0, 10)}
						</p>
						<p>
							{t("Description")}: {currentActivity.descriptionActivity}
						</p>
						{currentActivity.creatorActivity && (
							<Link
								to={`/user/${currentActivity.creatorActivity.uuid}`}
								className="user-link"
							>
								<div className="post__header">
									<img
										className="post__profile-img"
										src={`${currentActivity.creatorActivity.photoUser}`}
										alt="Profile"
									/>
									<div className="post__info">
										<p className="post__username_header">
											{t("Creator")}: {currentActivity.creatorActivity.nameUser}
										</p>
									</div>
								</div>
							</Link>
						)}

						<p>
							{t("Participants")}:{" "}
							{currentActivity.participantsActivity?.join(", ")}
						</p>
						{currentActivity.creatorActivity.uuid == myId && (
							<button
								onClick={() => handleAddToActivity(!isCurrentUserParticipant)}
							>
								{isCurrentUserParticipant
									? t("LeaveActivity")
									: t("JoinActivity")}
							</button>
						)}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default SharedContentPage;
