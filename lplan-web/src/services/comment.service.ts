import axios from "axios";

const API_URL = "http://localhost:5432/comment";


export class CommentService {
  
  static async getCommentsPublication(idPublication: string, numPage: string) {
    try {
      const response = await axios.get(API_URL + "/getComments/" + idPublication + "/" + numPage);
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }
}