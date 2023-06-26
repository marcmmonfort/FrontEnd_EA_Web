import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

import axios from "axios";

//const API_URL = "http://localhost:5432/user";
//const API_URL = "http://localhost:5432/auth";
let API_URL = "";
if (process.env.NODE_ENV === "production") {
	// Cargar variables de entorno desde .env.production
	API_URL = "http://147.83.7.158:5432/user";
} else {
	// Cargar variables de entorno desde .env.local
	API_URL = "http://localhost:5432/user";
}

export class AuthService {
	static isLoggedIn(): boolean {
		return !!localStorage.getItem("token");
	}

	static async login(auth: Auth) {
		try {
			const response = await axios.post(API_URL + "/loginfrontend", auth);
			return response;
		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	}
	static async loginGoogle(auth: Auth) {
		try {
			const response = await axios.post(API_URL + "/loginfrontendgoogle", auth);
			return response;
		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	}

	static async register(user: User) {
		try {
			const response = await axios.post(API_URL + "/register", user);
			return response;
		} catch (error) {
			console.error("Error during register:", error);
			throw error;
		}
	}

	static getCurrentUser() {
		const userId = localStorage.getItem("uuid");
		if (userId) {
			return JSON.parse(userId);
		}
	}

	static setCurrentUser(userId: string, token: string) {
		localStorage.setItem("uuid", userId);
		localStorage.setItem("token", token);
	}

	static logOut() {
		localStorage.removeItem("uuid");
		localStorage.removeItem("token");
	}

	static setAudioDescription(isAudioDescription: string) {
		localStorage.setItem("AudioDescription", isAudioDescription);
	}

	static getAudioDescription() {
		const AudioDescription = localStorage.getItem("AudioDescription");

		if (AudioDescription) {
			return AudioDescription;
		}
	}

	static setVoiceControl(isAudioDescription: string) {
		localStorage.setItem("voiceRecognitionEnabled", isAudioDescription);
	}

	static getVoiceControl() {
		const AudioDescription = localStorage.getItem("voiceRecognitionEnabled");

		if (AudioDescription) {
			return AudioDescription;
		}
	}
}
