import { User } from "./user.model";

export interface Publication {
    uuid:string;
    idUser:User;
    likesPublication?:[string];
    textPublication?:string;
    photoPublication:[string];
    commentsPublication?:[string];
    createdAt:string;
    updatedAt:string;
}