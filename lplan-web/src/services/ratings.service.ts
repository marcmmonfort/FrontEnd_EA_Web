import axios from "axios";
import authHeader from "./authHeader.service";
import { RatingsEntity } from "../models/ratings.model";

let API_URL="";

if (process.env.NODE_ENV === 'production') {
    API_URL = "http://147.83.7.158:5432";
} else {
    API_URL = "http://localhost:5432";
}

export class RatingsService {
  
    // (GET) getAllRatings()

    static async getAllRatings() {
        try {
            const response = await axios.get(API_URL + "/ratings/all", { headers: authHeader() });
            return response;
        } catch (error) {
            console.error('Error al obtener todos los ratings.', error);
            throw error;
        }
    }

    // (GET) getUsersWhoHaveRated(uuid: string)

    static async getUsersWhoHaveRated(uuid: string) {
        try {
            const response = await axios.get(API_URL + "/rating/getraters/" + uuid, { headers: authHeader() });
            return response;
        } catch (error) {
            console.error('Error obteniendo los usuarios que han participado en un rating.', error);
            throw error;
        }
    }

    // (GET) getRating(idRatedObject: string, ratingType: string)

    static async getRating(idRatedObject: string, ratingType:string) {
        try {
            const response = await axios.get(API_URL + "/rating/get/" + idRatedObject + "/" + ratingType, { headers: authHeader() });
            return response;
        } catch (error) {
            console.error('Error obteniendo un rating entero.', error);
            throw error;
        }
    }

    // (POST) insertRating(data: RatingsEntity)

    static async insertRating(rating: RatingsEntity) {
        try {
            const response = await axios.post(API_URL + "/rating/add", rating, { headers: authHeader() });
            return response;
        } catch (error) {
            console.error('Error creando por primera vez un rating.', error);
            throw error;
        }
    }

    // (PUT) updateRating(uuid: string, data: RatingsEntity)

    static async updateRating(uuid: string, rating: RatingsEntity) {
        try {
            const response = await axios.put(API_URL + "/rating/update/" + uuid, rating, { headers: authHeader() });
            return response;
        } catch (error) {
            console.error('Error actualizando un rating.', error);
            throw error;
        }
    }

}