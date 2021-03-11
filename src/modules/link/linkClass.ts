import { Document } from 'mongoose';
import { ILink } from './link';

export class Link extends Document implements ILink {
	user;
	url_source;
	url_target;
	uri;
	enable;
	createdAt;
	updatedAt;
}
