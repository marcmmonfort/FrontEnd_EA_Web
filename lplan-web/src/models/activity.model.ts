import { User } from "./user.model";

export interface ActivityEntity{
    uuid?:string;
    nameActivity: string;
    creatorActivity: string;
    participantsActivity: string[];
    publicationActivity?: string[];
    dateActivity: Date;
    hoursActivity: string[];
    idLocation?: string;
    descriptionActivity?: string;
    privacyActivity: boolean;
    roleActivity: string ;
}

export interface ActivityShare{
    uuid?:string;
    nameActivity: string;
    creatorActivity: User;
    participantsActivity: string[];
    publicationActivity?: string[];
    dateActivity: Date;
    hoursActivity: string[];
    idLocation?: string;
    descriptionActivity?: string;
    privacyActivity: boolean;
    roleActivity: string ;
}