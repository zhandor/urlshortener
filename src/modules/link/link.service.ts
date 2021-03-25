import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

	async getAllByUser(userId: string) {
		console.log({ userId });
		return await this.linkModel.find({ user: userId });
	}

	async getById(id: string) {
		return await this.linkModel.findById(id).exec();
	}

	async getByLink(link: string) {
		return await this.linkModel.findOne({ link }).exec();
	}

	getByHash(uri: string) {
		return this.linkModel.findOne({ uri, enable: true }).exec();
	}

	async redirectByHash(uri: string) {
		console.log('redirectByHash: ', uri)
		const link = await this.getByHash(uri);

		if (link) {
			return { url: link.url_target, statusCode: HttpStatus.FOUND };
		}

		throw new NotFoundException();
	}

	saveStats(stats: any, linkId: string) {
		console.log('Saving Stats...')
		return Promise.resolve({ ...stats, link: linkId });
	}

	async create(link: Link) {
		if (typeof link.uri == 'undefined') {
			link.uri = generateHash(link.url_source);
		} else {
			const retunedLink = await this.redirectByHash(link.uri);
			console.log(retunedLink);
			return 'o texto escolhido para encurtar seu link ja está em uso';
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
