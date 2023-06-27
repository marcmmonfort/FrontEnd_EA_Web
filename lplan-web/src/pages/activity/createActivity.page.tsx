import React, { useEffect, useState } from "react";
import { ActivityEntity } from "../../models/activity.model";
import { ActivityService } from "../../services/activity.service";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input.component";
import Footer from "../../components/footer/footer";
import "./createActivity.page.css";
import { setDate } from "date-fns";
import { useTranslation } from "react-i18next";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

const CreateActivity = () => {
	const [activity, setActivity] = useState<ActivityEntity>({
		nameActivity: "",
		creatorActivity: "",
		participantsActivity: [],
		publicationActivity: [],
		dateActivity: new Date(),
		hoursActivity: [],
		descriptionActivity: "",
		privacyActivity: false,
		roleActivity: "",
	});

	const [selectedHourStart, setSelectedHourStart] = useState("0");
	const [selectedMinuteStart, setSelectedMinuteStart] = useState("0");
	const [selectedHourEnd, setSelectedHourEnd] = useState("0");
	const [selectedMinuteEnd, setSelectedMinuteEnd] = useState("0");

	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		const isAudioDescription = AuthService.getAudioDescription();
		if (isAudioDescription === "si") {
			const pageToSpeech = "You are in create an Activity";
			speakText(pageToSpeech);
		}
		const value = AuthService.getCurrentUser();
		const getUser = async () => {
			const userId = AuthService.getCurrentUser();
			if (userId) {
				UserService.getPerson(userId)
					.then((response) => {
						if (
							response.data.roleUser === "admin" ||
							response.data.roleUser === "verified"
						) {
							setActivity((prevActivity) => ({
								...prevActivity,
								creatorActivity: value,
								participantsActivity: [
									value,
									...(prevActivity.participantsActivity || []),
								],
								roleActivity: "verificado",
							}));
						} else if (response.data.roleUser === "business") {
							setActivity((prevActivity) => ({
								...prevActivity,
								creatorActivity: value,
								participantsActivity: [
									value,
									...(prevActivity.participantsActivity || []),
								],
								roleActivity: "empresa",
							}));
						} else {
							setActivity((prevActivity) => ({
								...prevActivity,
								creatorActivity: value,
								participantsActivity: [
									value,
									...(prevActivity.participantsActivity || []),
								],
								roleActivity: "common",
							}));
						}
					})
					.catch((error) => {
						navigate("*");
					});
			}
		};
		getUser();
	}, []);

	// Función para leer el texto en voz alta
	const speakText = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en";
		window.speechSynthesis.speak(utterance);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (name === "dateActivity") {
			const dateValue = new Date(value);
			setActivity((prevActivity) => ({ ...prevActivity, [name]: dateValue }));
		} else {
			setActivity((prevActivity) => ({
				...prevActivity,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const hoursActivityStart = `${selectedHourStart}:${selectedMinuteStart}`;
		const hoursActivityEnd = `${selectedHourEnd}:${selectedMinuteEnd}`;

		const dateActivity = new Date(activity.dateActivity);

		if (isNaN(dateActivity.getTime())) {
			console.error("Fecha de actividad inválida");
			return;
		}
		setActivity((prevActivity) => ({
			...prevActivity,
			dateActivity,
		}));
		activity.hoursActivity = [hoursActivityStart, hoursActivityEnd];
		ActivityService.createActivity(activity)
			.then((response) => {
				navigate("/calendarevents");
			})
			.catch((error) => {
				console.error(error);
				navigate("*");
			});
	};

	const handleHourStartChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedHourStart(event.target.value);
	};

	const handleMinuteStartChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedMinuteStart(event.target.value);
	};

	const handleHourEndChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedHourEnd(event.target.value);
	};

	const handleMinuteEndChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedMinuteEnd(event.target.value);
	};

	// Generar las opciones de horas (desde 0 hasta 23)
	const hours = Array.from({ length: 24 }, (_, index) => index);
	const minutes = Array.from({ length: 60 }, (_, index) => index);

	return (
		<div>
			<h1>{t("CreateActivity")}</h1>
			<form onSubmit={handleSubmit} className="scroll-container">
				<Input
					label="Nombre de la actividad"
					name="nameActivity"
					type="text"
					value={activity.nameActivity}
					onChange={handleInputChange}
				/>
				<Input
					label="Fecha de la actividad"
					name="dateActivity"
					type="date"
					value={new Date(activity.dateActivity).toISOString().substr(0, 10)} //new Date(user.birthdateUser).toISOString().substr(0, 10)
					onChange={handleInputChange}
				/>
				<div>
					<label>Inicio de la actividad:</label>
					<div>
						<label>Hora:</label>
						<select value={selectedHourStart} onChange={handleHourStartChange}>
							{hours.map((hour) => (
								<option key={hour} value={hour}>
									{hour.toString().padStart(2, "0")}
								</option>
							))}
						</select>

						<label>Minuto:</label>
						<select
							value={selectedMinuteStart}
							onChange={handleMinuteStartChange}
						>
							{minutes.map((minute) => (
								<option key={minute} value={minute}>
									{minute.toString().padStart(2, "0")}
								</option>
							))}
						</select>
					</div>

					<label>Fin de la actividad:</label>
					<div>
						<label>Hora:</label>
						<select value={selectedHourEnd} onChange={handleHourEndChange}>
							{hours.map((hour) => (
								<option key={hour} value={hour}>
									{hour.toString().padStart(2, "0")}
								</option>
							))}
						</select>

						<label>Minuto:</label>
						<select value={selectedMinuteEnd} onChange={handleMinuteEndChange}>
							{minutes.map((minute) => (
								<option key={minute} value={minute}>
									{minute.toString().padStart(2, "0")}
								</option>
							))}
						</select>
					</div>
				</div>
				<Input
					label="Descripción de la actividad"
					name="descriptionActivity"
					type="text"
					value={activity.descriptionActivity}
					onChange={handleInputChange}
				/>
				<input
					type="checkbox"
					name="privacyActivity"
					checked={activity.privacyActivity}
					onChange={handleInputChange}
				/>
				<button type="submit">{t("Create")}</button>
			</form>
			<Footer />
		</div>
	);
};

export default CreateActivity;
