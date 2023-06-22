import axios from "axios";
import authHeader from "./authHeader.service";
import { Comment } from "../models/comment.model";

//const API_URL = "http://localhost:5432/comment";
let API_URL="";
if (process.env.NODE_ENV === 'production') {
  // Cargar variables de entorno desde .env.production
  API_URL = "https://api.lplan.es/comment";
} else {
  // Cargar variables de entorno desde .env.local
  API_URL = "http://localhost:5432/comment";
}



export class CommentService {
  
  //OBTENER LAS PUBLICACIONES DE LA GENTE QUE SIGUES
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

  //CREAR UN COMENTARIO
  static async createComment(comment: Comment) {
    try {
      const response = await axios.post(API_URL + "/add", comment, { headers: authHeader() });
      console.log("try response " + response)
      return response;
    } catch (error) {
      console.error('Error during loading comments:', error);
      throw error;
    }
  }

}