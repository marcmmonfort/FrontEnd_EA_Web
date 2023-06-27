import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./settings.page.css";
import backgroundImage from "../../assets/images/background_7.jpg";
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import { useTranslation } from "react-i18next";

document.body.style.backgroundImage = `url(${backgroundImage})`;

const lngs: any = {
	en: { nativeName: "English" },
	es: { nativeName: "Español" },
	pt: { nativeName: "Português" },
	de: { nativeName: "Deutsch" },
};

const SettingsPage = () => {
	const { t, i18n } = useTranslation();
	const [audioDescriptionEnabled, setAudioDescriptionEnabled] = useState(false);
	const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);

	useEffect(() => {
		const isAudioDescription = AuthService.getAudioDescription();
		if (isAudioDescription === "si") {
			setAudioDescriptionEnabled(true);
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

	const handleToggleAudioDescription = () => {
		const newAudioDescriptionEnabled = !audioDescriptionEnabled;
		setAudioDescriptionEnabled(newAudioDescriptionEnabled);
		AuthService.setAudioDescription(newAudioDescriptionEnabled ? "si" : "no");
	};

	const handleToggleVoiceControl = () => {
		const newVoiceControlEnabled = !voiceControlEnabled;
		setVoiceControlEnabled(newVoiceControlEnabled);
		AuthService.setVoiceControl(newVoiceControlEnabled ? "si" : "no");
	};

	return (
		<div>
			<Navbar />
			<div className="titleContainer">
				<h1 className="titleSection">{t("Settings")}</h1>
				<div className="LanguageButtons">
					{Object.keys(lngs).map((lng) => (
						<button
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
				<h2>{t("AudioDescription")}</h2>
				<p>{t("Enaudiodescription1")}</p>
				<label>
					<input
						type="checkbox"
						checked={audioDescriptionEnabled}
						onChange={handleToggleAudioDescription}
					/>
					{t("Enaudiodescription2")}
				</label>
			</div>
			<div className="settingsContainer">
				<h2>{t("Vcontrol")}</h2>
				<p>{t("EVcontrolforNavigation")}</p>
				<label>
					<input
						type="checkbox"
						checked={voiceControlEnabled}
						onChange={handleToggleVoiceControl}
					/>
					{t("EVcontrol")}
				</label>
			</div>
			<Footer />
		</div>
	);
};

export default SettingsPage;
