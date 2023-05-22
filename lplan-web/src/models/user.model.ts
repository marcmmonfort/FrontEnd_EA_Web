import { Auth } from "./auth.model";

export interface User {
    uuid?:string;
    appUser: string;
    nameUser: string;
    surnameUser: string;
    mailUser:string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: "male" | "female";
    ocupationUser?: string;
    descriptionUser: string;
    roleUser: "admin" | "common" | "verified" | "business";
    privacyUser: boolean;
    deletedUser: boolean;
    followersUser?: string[];
    followedUser?: string[];
}


export interface UserAuthEntity extends User{
    passwordUser:string;
}