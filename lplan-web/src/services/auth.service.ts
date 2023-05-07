import { Auth } from "../models/auth.model";

import axios from "axios";

const API_URL = "http://localhost:5432/auth";


export class AuthService {
  static async login(auth: Auth) {
    try {
      const response = await axios.post(API_URL + "/login", auth);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
      }
    }
  }
  
  /*
  logout() {
    localStorage.removeItem("user");
  }
  */
  
  /*
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
  */

export default new AuthService();