export interface RatingsEntity {
	uuid?: string;
	ratingType:
		| "users"
		| "activities"
		| "locations"
		| "comments"
		| "publications";
	idRatedObject: string;
	ratingAverage: number;
	idRaters?: string[];
}
