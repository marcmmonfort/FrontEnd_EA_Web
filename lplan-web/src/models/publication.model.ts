import { ObjectId } from "mongoose";
import { User } from "./user.model";

export interface Publication {
    _id: string,
    idUserPublication: User,
    likesPublication?: ObjectId[],
    textPublication?: string,
    photoPublication: string[], // Aquí van las fotos de las publicaciones.
    commentsPublication?: ObjectId[],
    createdAt: string,
    updatedAt: string,
}