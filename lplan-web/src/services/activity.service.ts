import axios from "axios";
import authHeader from "./authHeader.service";
import { ActivityEntity } from "../models/activity.model";


let API_URL="";
if (process.env.NODE_ENV === 'production') {
  // Cargar variables de entorno desde .env.production
  API_URL = "http://147.83.7.158:5432/activity";
} else {
  // Cargar variables de entorno desde .env.local
  API_URL = "http://localhost:5432/activity";
}



export class ActivityService {
  
  
  static async createActivity(activity: ActivityEntity) {
    try {
      const response = await axios.post(API_URL + "/add", activity, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  //OBTENER LAS ACTIVITIES DE LA GENTE QUE SIGUES
  static async getMySchedule(uuid: string, date: string) {
    try {
      const response = await axios.get(API_URL + "/myweek/" + uuid + "/" + date, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getOtherSchedule(uuid: string, numPage:string, date: string) {
    try {
      const response = await axios.get(API_URL + "/following/" + uuid + "/" + numPage + "/" + date, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async updateActivity(uuid: string, activity: ActivityEntity) {
    try {
      const response = await axios.put(API_URL + "/" + uuid, activity, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

}