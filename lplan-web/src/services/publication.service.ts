import axios from "axios";
import authHeader from "./authHeader.service";

const API_URL = "http://localhost:5432/publication";


export class PublicationService {
  
  static async feed(numPage: string, userId: string) {
    try {
      const response = await axios.get(API_URL + "/getPostFollowed/" + numPage + "/" + userId, { headers: authHeader() });
      //console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during load feed:', error);
      throw error;
    }
  }

}