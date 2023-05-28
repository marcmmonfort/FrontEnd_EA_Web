export interface Activity{
    uuid:string;
    nameActivity: string;
    creatorActivity: string;
    participantsActivity?: [string];
    publicationActivity?: string;
    dateActivity: Date;
    hoursActivity: [string];
    idLocation?: string;
    descriptionActivity?: string;
    privacyActivity: boolean;
    roleActivity: "verificado" | "common" | "empresa" ;
}