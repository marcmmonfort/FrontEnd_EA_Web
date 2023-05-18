import { ObjectId } from "mongoose";
import { User } from "./user.model";

export interface Comment {
    _id: string,
    idUserComment: ObjectId,
    idPublicationComment?: ObjectId,
    textComment: string,
    likesComment?: ObjectId[],
    responseComment?: ObjectId[], 
    createdAt: string,
    updatedAt: string,
}