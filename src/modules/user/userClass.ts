import { Document } from 'mongoose';
import { IUser } from './user';

export class User extends Document implements IUser {
	email;
	token;
}
