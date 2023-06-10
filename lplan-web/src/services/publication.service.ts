import axios from "axios";
import authHeader from "./authHeader.service";


let API_URL="";
if (process.env.NODE_ENV === 'production') {
  // Cargar variables de entorno desde .env.production
  API_URL = "http://147.83.7.158:5432/publication";
} else {
  // Cargar variables de entorno desde .env.local
  API_URL = "http://localhost:5432/publication";
}


export class PublicationService {
  
  static async feed(numPage: string, uuid: string) {
    try {
      const response = await axios.get(API_URL + "/followingPost/" + numPage + "/" + uuid, { headers: authHeader() });
      //console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }

  // BEREAL
  static async obtainOwnPosts(uuid: string) {
    try {
      const response = await axios.get(API_URL + "/ownPosts/" + uuid, { headers: authHeader() });
      return response;
    } catch (error) {
      console.error('Error when obtaining the own posts:', error);
      throw error;
    }
  }

  static async numPublicationsFollowing( uuid: string) {
    try {
      const response = await axios.get(API_URL + "/numFollowingPost/" + uuid, { headers: authHeader() });
      //console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }

  static async updateLike( uuid: string, uuidUser:string) {
    try {
      const response = await axios.put(API_URL + "/parameter/like",{ uuid: uuid, uuidUser: uuidUser}, { headers: authHeader() });
      //console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }

  static async deleteLike( uuid: string, uuidUser:string) {
    try {
      const response = await axios.put(API_URL + "/delete/like",{ uuid: uuid, uuidUser: uuidUser}, { headers: authHeader() });
      //console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }

  static async getListLikes( uuid: string|undefined, numPage:string) {
    try {
      const response = await axios.get(API_URL + "/likes/" + uuid + "/" + numPage, { headers: authHeader() });
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }

  static async getPublication( uuid: string|undefined) {
    try {
      const response = await axios.get(API_URL + "/"+ uuid, { headers: authHeader() });
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }



}