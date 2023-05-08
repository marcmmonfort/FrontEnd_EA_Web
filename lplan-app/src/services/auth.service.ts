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

  export default new AuthService();