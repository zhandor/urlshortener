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

	async getByEmail(email: string) {
		return await this.userModel.findOne({ email }).exec();
	}

	async create(user: User) {
		user.token = uuidv4();
		const createdUser = new this.userModel(user);
		return await createdUser.save();
	}

	async update(id: string, user: User) {
		const options = { new: true, select: {}, omitUndefined: true };
		return await this.userModel.findByIdAndUpdate(id, user, options).exec();
	}

	async delete(id: string) {
		return await this.userModel
			.findByIdAndRemove(id)
			.then(() => {
				return true;
			})
			.catch((error) => {
				console.log({ error });
				return false;
			});
	}
}
