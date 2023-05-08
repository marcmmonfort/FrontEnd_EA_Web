import { ObjectId } from "mongoose";
import { Auth } from "./auth.model";

export interface User extends Auth {
    appUser: string;
    nameUser: string;
    surnameUser: string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: "male" | "female";
    ocupationUser?: string;
    descriptionUser: string;
    roleUser: "admin" | "common" | "verified" | "business";
    privacyUser: boolean;
    deletedUser: boolean;
    followersUser?: ObjectId[];
    followedUser?: ObjectId[];
}