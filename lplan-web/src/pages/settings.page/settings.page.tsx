import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./settings.page.css";
import backgroundImage from "../../assets/images/background_7.jpg";
import { AuthService } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { UserService } from "../../services/user.service";
document.body.style.backgroundImage = `url(${backgroundImage})`;

const lngs: any = {
	en: { nativeName: "English" },
	es: { nativeName: "Español" },
	pt: { nativeName: "Português" },
	de: { nativeName: "Deutsch" },
};

const SettingsPage = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [audioDescriptionEnabled, setAudioDescriptionEnabled] = useState(false);
	const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);
	const [disableAccountEnabled, setDisableAccountEnabled] = useState(false);
	const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

	useEffect(() => {
		const isAudioDescription = AuthService.getAudioDescription();
		if (isAudioDescription === "si") {
			setAudioDescriptionEnabled(true);
			const pageToSpeech = "You are in settings";
			speakText(pageToSpeech);
		} else if (isAudioDescription === "no") {
			setAudioDescriptionEnabled(false);
		}

		const isVoiceControlEnabled = AuthService.getVoiceControl();
		if (isVoiceControlEnabled === "si") {
			setVoiceControlEnabled(true);
		} else if (isVoiceControlEnabled === "no") {
			setVoiceControlEnabled(false);
		}
	}, []);

	// Función para leer el texto en voz alta
	const speakText = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en";
		window.speechSynthesis.speak(utterance);
	};

	const handleToggleAudioDescription = () => {
		const newAudioDescriptionEnabled = !audioDescriptionEnabled;
		setAudioDescriptionEnabled(newAudioDescriptionEnabled);
		AuthService.setAudioDescription(newAudioDescriptionEnabled ? "si" : "no");
	};

	const handleToggleVoiceControl = () => {
		const newVoiceControlEnabled = !voiceControlEnabled;
		setVoiceControlEnabled(newVoiceControlEnabled);
		if (newVoiceControlEnabled) {
			const pageToSpeech = "Say finalizar for end the voice control.";
			speakText(pageToSpeech);
		}
		AuthService.setVoiceControl(newVoiceControlEnabled ? "si" : "no");
	};

	const handleDisableAccount = () => {
		setShowConfirmationPopup(true);
	};

	const confirmDisableAccount = () => {
		setDisableAccountEnabled(true);
		const id = AuthService.getCurrentUser();
		if (id) {
			UserService.disableUser(id);
		}

		setShowConfirmationPopup(false);
	};

	return (
		<div>
			<Navbar />
			<div className="titleContainer">
				<h1 className="titleSection">{t("Settings")}</h1>
				<div className="LanguageButtons">
					{Object.keys(lngs).map((lng) => (
						<button
							className="languageButton"
							type="submit"
							key={lng}
							onClick={() => i18n.changeLanguage(lng)}
							disabled={i18n.resolvedLanguage === lng}
						>
							{lngs[lng].nativeName}
						</button>
					))}
				</div>
			</div>
			<div className="settingsContainer">
				<h2 className="titleCD">{t("AudioDescription")}</h2>
				<div className="rowTickCD">
					<p className="commentsCD">{t("Enaudiodescription1")}</p>
					<label>
						<input
							className="tickCD"
							type="checkbox"
							checked={audioDescriptionEnabled}
							onChange={handleToggleAudioDescription}
						/>
					</label>
				</div>
			</div>
			<div className="settingsContainer">
				<h2 className="titleCD">{t("Vcontrol")}</h2>
				<div className="rowTickCD">
					<p className="commentsCD">{t("EVcontrolforNavigation")}</p>
					<label>
						<input
							className="tickCD"
							type="checkbox"
							checked={voiceControlEnabled}
							onChange={handleToggleVoiceControl}
						/>
					</label>
				</div>
			</div>
			<div className="settingsContainer">
				<h2 className="titleCD">Delete Account</h2>
				<div className="rowTickCD">
					<p className="commentsCD">Do you want to disable your account?</p>
					<label>
						<input
							className="tickCD"
							type="checkbox"
							checked={disableAccountEnabled}
							onChange={handleDisableAccount}
						/>
					</label>
				</div>
			</div>
			{showConfirmationPopup && (
				<div className="confirmationPopup">
					<p className="commentsDehactivateCD">
						¿Estás seguro de que quieres deshabilitar tu cuenta?
					</p>
					<button className="yesNoButtonCD" onClick={confirmDisableAccount}>
						Sí
					</button>
					<button
						className="yesNoButtonCD"
						onClick={() => {
							setShowConfirmationPopup(false);
							setDisableAccountEnabled(false);
						}}
					>
						No
					</button>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default SettingsPage;
