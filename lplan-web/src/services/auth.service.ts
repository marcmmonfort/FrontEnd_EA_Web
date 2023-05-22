import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

import axios from "axios";


const API_URL = "http://localhost:5432/user";
//const API_URL = "http://localhost:5432/auth";


export class AuthService {
    
  static isLoggedIn(): boolean {
    console.log('Estoy' + localStorage.getItem('token'));
    return !!localStorage.getItem('token');
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
    const userId = localStorage.getItem("uuid");
    if(userId){
      return JSON.parse(userId);
    }
  }

  static setCurrentUser(userId:string, token:string) {
    localStorage.setItem("uuid",userId);
    localStorage.setItem("token", token);
  }

  static logOut() {
    localStorage.removeItem("uuid");
    localStorage.removeItem("token");
  }
}

