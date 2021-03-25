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
		return this.linkModel.findOne({ uri }).exec();
	}

	async redirectByHash(uri: string) {
		const link = await this.getByHash(uri);

		console.log({
			location: 'link.services => redirectByHash',
			link: link.url_target,
		});

		if (link.url_target) {
			console.log({
				url: 'http://' + link.url_target,
				statusCode: HttpStatus.FOUND,
			});
			return { url: link.url_target, statusCode: HttpStatus.FOUND };
		} else {
			throw new NotFoundException('Não encontramos seu encurtador');
		}
	}

	async create(link: Link) {
		if (typeof link.uri == 'undefined') {
			link.uri = generateHash(link.url_source);
		} else {
			const retunedLink = await this.getByHash(link.uri);
			console.log(retunedLink);
			return 'o texto escolhido para encurtar seu link ja está em uso';
		}
		link.url_source = 'localhost:3000/' + link.uri;

		const createdLink = new this.linkModel(link);
		console.log(await createdLink.save());
		return true;
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
