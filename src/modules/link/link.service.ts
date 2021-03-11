import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Link } from './linkClass';

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
		return await (await this.linkModel.findOne({ link })).execPopulate();
	}

	async create(link: Link) {
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
