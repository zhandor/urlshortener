import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User } from './userClass';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async getAll() {
		return await this.userModel.find().exec();
	}

	async getById(id: string) {
		return await this.userModel.findById(id).exec();
	}

	async create(user: User) {
		user.token = uuidv4();
		const createdUser = new this.userModel(user);
		return await createdUser.save();
	}

	async update(id: string, user: User) {
		await this.userModel.updateOne({ id }, user).exec();
		return this.getById(id);
	}

	async delete(id: string) {
		console.log({ id });
		return { id };
	}

	getUser(): string {
		return 'retornando o user';
	}

	getInfo(): string {
		return uuidv4();
	}
}
