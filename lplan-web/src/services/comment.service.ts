import axios from "axios";
import authHeader from "./authHeader.service";

//const API_URL = "http://localhost:5432/comment";
let API_URL="";
if (process.env.NODE_ENV === 'production') {
  // Cargar variables de entorno desde .env.production
  API_URL = "http://147.83.7.158:5432/comment";
} else {
  // Cargar variables de entorno desde .env.local
  API_URL = process.env.REACT_APP_API_URL_LOCAL + "/comment";
}



export class CommentService {
  
  static async getCommentsPublication(uuidPublication: string, numPage: string) {
    try {
      const response = await axios.get(API_URL + "/publication/by/paginated/" + uuidPublication + "/" + numPage, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

}