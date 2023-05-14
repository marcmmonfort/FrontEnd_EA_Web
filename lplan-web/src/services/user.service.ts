import axios from "axios";

const API_URL = "http://localhost:5432/user";

export class UserService {

  static async getUsers()  {
    try {
      const response= await axios.get(API_URL + "/all/" + 1);
      return response;
      
    } catch (error) {
      console.error('Error during register:', error);
      throw error;
    }
  }

  static async searchUsers(searchQuery:string)  {
    try {
      console.log("He entrado al servicio:" + searchQuery);
      const response= await axios.get(API_URL + "/searchUserCtrl/" + searchQuery);
      return response;
      
    } catch (error) {
      console.error('Error during register:', error);
      throw error;
    }
  }

}

