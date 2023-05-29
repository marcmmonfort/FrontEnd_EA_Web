export interface ActivityEntity{
    uuid?:string;
    nameActivity: string;
    creatorActivity: string;
    participantsActivity?: string[] | undefined;
    publicationActivity?: string[];
    dateActivity: Date;
    hoursActivity: string[];
    idLocation?: string;
    descriptionActivity?: string;
    privacyActivity: boolean;
    roleActivity: string ;
}