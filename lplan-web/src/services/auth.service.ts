import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

import axios from "axios";

const API_URL = "http://localhost:5432/auth";


export class AuthService {
    
  static isLoggedIn(): boolean {
      console.log('Estoy' + localStorage.getItem('token'));
      return !!localStorage.getItem('userData');
    }
  
  static async login(auth: Auth) {
    try {
      const response = await axios.post(API_URL + "/loginfrontend", auth);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  static async register(user:User)  {
    try {
      const response = await axios.post(API_URL + "/register", user);
      return response;
    } catch (error) {
      console.error('Error during register:', error);
      throw error;
    }
  }

  static getCurrentUser() {
    const userStr = localStorage.getItem("userData");
    console.log("str " + userStr)
    if (userStr){
      console.log("JSOn " + JSON.parse(userStr))
      return JSON.parse(userStr);
    }
    
    return null;
  }


  static logOut() {
      localStorage.removeItem("userData");
  }
}