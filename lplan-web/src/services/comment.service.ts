import axios from "axios";
import authHeader from "./authHeader.service";

const API_URL = "http://localhost:5432/comment";


export class CommentService {
  
  static async getCommentsPublication(idPublication: string, numPage: string) {
    try {
      const response = await axios.get(API_URL + "/getComments/" + idPublication + "/" + numPage, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

}