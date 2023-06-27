import axios from "axios";
import authHeader from "./authHeader.service";
import { ActivityEntity } from "../models/activity.model";


let API_URL="";
if (process.env.NODE_ENV === 'production') {
  // Cargar variables de entorno desde .env.production
  API_URL = "http://147.83.7.158:5432/";
} else {
  // Cargar variables de entorno desde .env.local
  API_URL = "http://localhost:5432/";
}

export class ActivityService {
  
  
  static async createActivity(activity: ActivityEntity) {
    try {
      const response = await axios.post(API_URL + "activity/add", activity, { headers: authHeader() });
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
      const response = await axios.get(API_URL + "activity/myweek/" + uuid + "/" + date, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }
  static async getActivitiesOfALocation(uuid: string){
    try{
        const response=await axios.get(API_URL + "activities/bylocation/" + uuid,{headers: authHeader()});
        return response;
    } catch(error){
        console.error('Error obtaining the activities of a location: '+error);
        throw error;
    }
  }

  static async getOtherSchedule(uuid: string, numPage:string, date: string) {
    try {
      const response = await axios.get(API_URL + "activity/following/" + uuid + "/" + numPage + "/" + date, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async updateActivity(uuid: string, activity: ActivityEntity) {
    try {
      const response = await axios.put(API_URL + "activity/" + uuid, activity, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getActivity(uuid: string) {
    try {
      const response = await axios.get(API_URL + "activity/" + uuid, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getAllActivitiesParticipatedByUser(uuid: string) {
    try {
      console.log(uuid);
      const response = await axios.get(API_URL + "activity/all/" + uuid, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getAllActivitiesCreatedByUser(uuid: string) {
    try {
      console.log(uuid);
      const response = await axios.get(API_URL + "activity/all/created/" + uuid, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getActivitiesLastMonthByUser(uuid: string, date:string) {
    try {
      console.log(uuid);
      const response = await axios.get(API_URL + "activity/mymonth/" + uuid +"/" + date, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getActivitiesLast6Weeks(uuid: string) {
    try {
      console.log(uuid);
      const response = await axios.get(API_URL + "activity/last6weeks/" + uuid, { headers: authHeader() });
      console.log("try response last 6" + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

  static async getActivitiesByMonthAndYear(myUserId: string, month: string, year: string){
    try {
      console.log(myUserId);
      const response = await axios.get(API_URL + "activity/monthyear/" + myUserId + "/" + month + "/" + year, { headers: authHeader() });
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

}