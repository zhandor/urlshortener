import { ILink } from '../link/link';

export interface IUser {
	email: string;
	token?: string;
	links?: ILink[];
	createdAt?: Date;
	updatedAt?: Date;
}
