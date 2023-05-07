import axios from "axios";
import { User } from "../models/user.model";

const API_URL = "http://localhost:5432/user";

export class AuthService {
  
  /*
  logout() {
    localStorage.removeItem("user");
  }
  */

  static async register(user:User)  {
    try {
      const response = await axios.post(API_URL + "/register", {user});
      return response;
    } catch (error) {
      console.error('Error during register:', error);
      throw error;
      }
    }
  /*
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
  */
}