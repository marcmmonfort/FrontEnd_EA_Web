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

  static async getPerson(userId:string)  {
    
    try {
      const response= await axios.get(API_URL + "/" + userId);
      return response;
      
    } catch (error) {
      console.error('Error when obtaining person:', error);
      throw error;
    }
  }

  static async isFollowed(userId:string, followerId:string)  {
    
    try {
      const response= await axios.get(API_URL + "/isFollower/" + userId + "/" + followerId);
      return response;
      
    } catch (error) {
      console.error('Error when obtaining if follower:', error);
      throw error;
    }
  }

  static async addFollowed(userId:string, followerId:string)  {
    
    try {
      const response= await axios.post(API_URL + "/followed", { idUser: userId, idFollowed: followerId });
      return response;
      
    } catch (error) {
      console.error('Error adding followed:', error);
      throw error;
    }
  }

  static async removeFollowed(userId:string, followerId:string)  {
    
    try {
      const response= await axios.post(API_URL + "/remfollowed/" + userId + "/" + followerId);
      return response;
      
    } catch (error) {
      console.error('Error removing followed:', error);
      throw error;
    }
  }

}

