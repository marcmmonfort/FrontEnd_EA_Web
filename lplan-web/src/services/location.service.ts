import axios from "axios";

import authHeader from "./authHeader.service";

import { Location } from "../models/location.model";

let API_URL = "";
let API_URL_All = "";

if (process.env.NODE_ENV === "production") {
	// Cargar variables de entorno desde .env.production
	API_URL = "http://147.83.7.158:5432/location";
	API_URL_All = "http://147.83.7.158:5432/locations";
} else {
	// Cargar variables de entorno desde .env.local
	API_URL = "http://localhost:5432/location";
	API_URL_All = "http://localhost:5432/locations";
}

export class LocationService {
	//OK
	static async getLocations() {
		try {
			const response = await axios.get(API_URL_All + "/all", {
				headers: authHeader(),
			});
			return response;
		} catch (error) {
			console.error("Error during register:", error);
			throw error;
		}
	}

	//OK
	static async searchLocations(searchQuery: string) {
		try {
			console.log("He entrado al servicio:" + searchQuery);
			const response = await axios.get(API_URL + "/search/" + searchQuery, {
				headers: authHeader(),
			});
			return response;
		} catch (error) {
			console.error("Error during register:", error);
			throw error;
		}
	}

	//OK
	static async getLocation(locationId: string) {
		try {
			const response = await axios.get(API_URL + "/" + locationId, {
				headers: authHeader(),
			});
			return response;
		} catch (error) {
			console.error("Error when obtaining person:", error);
			throw error;
		}
	}
}
