import { User } from "./user.model";

export interface Publication {
	uuid: string;
	idUser: User;
	likesPublication?: [string];
	textPublication?: string;
	photoPublication: [string];
	commentsPublication?: [string];
	createdAt: string;
	updatedAt: string;
}

export interface PublicationLikes {
	uuid: string;
	idUser: string;
	likesPublication?: [User];
	textPublication?: string;
	photoPublication: [string];
	commentsPublication?: [string];
	createdAt: string;
	updatedAt: string;
}
