import { IUser } from "../user/user";

export interface ILink {
	user: IUser;
	url_source: string;
	url_target: string;
	uri: string;
	enable: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
