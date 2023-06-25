import { User } from "./user.model";

export interface Comment {
	uuid?: string;
	idUserComment: User;
	idPublicationComment: string;
	textComment: string;
	likesComment?: [string];
	responseComment?: [string];
}
