// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hashids = require('hashids');

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Link } from './linkClass';

import { generateHash } from '../../util';

@Injectable()
export class LinkService {
	constructor(@InjectModel('Link') private readonly linkModel: Model<Link>) {}

	async getAll() {
		return await this.linkModel.find().exec();
	}

	async getById(id: string) {
		return await this.linkModel.findById(id).exec();
	}

	async getByLink(link: string) {
		return await this.linkModel.findOne({ link }).exec();
	}

	async getByHash(uri: string) {
		return await this.linkModel.findOne({ link: { uri: uri } }).exec();
	}

	async create(link: Link) {
		if (typeof link.uri == 'undefined') {
			link.uri = generateHash(link.url_source);
		} else {
			const retunedLink = await this.getByHash(link.uri);
			console.log(retunedLink);
			return retunedLink;
		}
		link.url_source = 'localhost:3000/' + link.uri;

		const createdLink = new this.linkModel(link);
		return await createdLink.save();
	}

	async update(id: string, link: Link) {
		const options = { new: true, select: {}, omitUndefined: true };
		return await this.linkModel.findByIdAndUpdate(id, link, options).exec();
	}

	async delete(id: string) {
		return await this.linkModel
			.findByIdAndRemove(id)
			.then(() => {
				return true;
			})
			.catch((error) => {
				console.log(error);
				return false;
			});
	}
}
