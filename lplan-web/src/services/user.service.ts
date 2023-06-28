import axios from "axios";

import authHeader from "./authHeader.service";
import { User } from "../models/user.model";

//const API_URL = "http://localhost:5432/user";
let API_URL = "";
if (process.env.NODE_ENV === "production") {
	// Cargar variables de entorno desde .env.production
	API_URL = "http://147.83.7.158:5432/user";
} else {
	// Cargar variables de entorno desde .env.local
	API_URL = "http://localhost:5432/user";
	//API_URL = "http://147.83.7.158:5432/user";
}

export class UserService {
	//OK
	static async getUsers() {
		try {
			const response = await axios.get(API_URL + "/all/" + 1, {
				headers: authHeader(),
			});
			return response;
		} catch (error) {
			console.error("Error during register:", error);
			throw error;
		}
	}

	//OK
	static async searchUsers(searchQuery: string) {
		try {
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
	static async getPerson(userId: string) {
		try {
			const response = await axios.get(API_URL + "/" + userId, {
				headers: authHeader(),
			});
			return response;
		} catch (error) {
			console.error("Error when obtaining person:", error);
			throw error;
		}
	}
	static async getPersonByEmail(email: string) {
		try {
			const response = await axios.get(API_URL + "/google/check/" + email, {
				headers: authHeader(),
			});
			return response;
		} catch (error) {
			console.error("Error when obtaining person:", error);
			throw error;
		}
	}

	//OK
	static async isFollowed(uuid: string, uuidFollowed: string) {
		try {
			const response = await axios.get(
				API_URL + "/isFollower/" + uuid + "/" + uuidFollowed,
				{ headers: authHeader() }
			);
			return response;
		} catch (error) {
			console.error("Error when obtaining if follower:", error);
			throw error;
		}
	}

	//OK
	static async addFollowed(uuid: string, uuidFollowed: string) {
		try {
			const response = await axios.post(
				API_URL + "/followed",
				{ uuid: uuid, uuidFollowed: uuidFollowed },
				{ headers: authHeader() }
			);
			return response;
		} catch (error) {
			console.error("Error adding followed:", error);
			throw error;
		}
	}

	//OK
	static async removeFollowed(uuid: string, uuidFollowed: string) {
		try {
			const response = await axios.put(
				API_URL + "/followed/this",
				{ uuid: uuid, uuidFollowed: uuidFollowed },
				{ headers: authHeader() }
			);
			return response;
		} catch (error) {
			console.error("Error removing followed:", error);
			throw error;
		}
	}

	//OK
	static async getFollowers(uuid: string | undefined, numPage: string) {
		try {
			const response = await axios.get(
				API_URL + "/follower/" + uuid + "/" + numPage,
				{ headers: authHeader() }
			);
			return response;
		} catch (error) {
			console.error("Error getting followers:", error);
			throw error;
		}
	}

	//OK
	static async getFollowed(uuid: string | undefined, numPage: string) {
		try {
			const response = await axios.get(
				API_URL + "/followed/" + uuid + "/" + numPage,
				{ headers: authHeader() }
			);
			return response;
		} catch (error) {
			console.error("Error getting followed:", error);
			throw error;
		}
	}

	//OK
	static async editUser(user: User) {
		try {
			const response = await axios.put(API_URL + "/" + user.uuid, user, {
				headers: authHeader(),
			});

			return response;
		} catch (error) {
			console.error("Error editing user: ", error);
		}
		/*
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
      }
    
      getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
      }
    
      getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
      }
    */
	}

	static async disableUser(uuid: string | undefined) {
		try {
			const response = await axios.put(
				API_URL + "/disable/this",
				{ uuid: uuid },
				{ headers: authHeader() }
			);
			return response;
		} catch (error) {
			console.error("Error getting followed:", error);
			throw error;
		}
	}
}
