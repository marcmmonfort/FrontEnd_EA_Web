import axios from "axios";
import authHeader from "./authHeader.service";


const API_URL = "http://localhost:5432/user";

class userService {
    
    
    static async getUserById(id: string) {
        try {
          const response = await axios.get(API_URL + "/" + id, { headers: authHeader() });
          return response;
          
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        }
    }
    
    /*
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
      }
    
      getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
      }
    
      getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
      }
    */

}

export default new userService();
