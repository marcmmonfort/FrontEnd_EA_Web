import axios from "axios";
import authHeader from "./authHeader.service";
import { User } from "../models/user.model";


const API_URL = "http://localhost:5432/user";

export class userService {
    
    
    static async getUserById(id: string) {
        try {
          const response = await axios.get(API_URL + "/" + id, { headers: authHeader() });
          return response;
          
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        }
    }
    static async editUser(user:User){
      try{
          const response=await axios.put(API_URL+'/'+user._id,user,{headers:authHeader()},)
          return response;
      }
      catch(error){
        console.error('Error editing user: ', error)
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