import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
		return await this.userModel
			.findOne({ email })
			.exec()
			.then((result) => {
				if (result != null) {
					return result;
				} else {
					throw new NotFoundException('O email não existe no sistema');
				}
			});
	}

	async getByToken(token: string) {
		return await this.userModel
			.findOne({ token: token })
			.exec()
			.then((result) => {
				console.log({ result });
				if (result != null) {
					return result;
				} else {
					throw new UnauthorizedException(
						'Não existe usuário com o token: ' + token,
					);
				}
			});
	}

	async create(user: User) {
		const createdUser = new this.userModel(user);
		return await createdUser.save();
	}

	async authUser(user: User) {
		console.log({ user });
		const authUser = this.getByEmail(user.email);
		if ((await authUser).token == user.token) {
			return true;
		} else {
			throw new UnauthorizedException('Email ou Senha inválidos');
		}
	}

	async verifyUser(user: User) {
		const verUser = await this.userModel
			.findOne({ email: user.email })
			.exec()
			.then((result) => {
				if (result != null) {
					return result.token;
				} else {
					return this.create(user).then((res) => {
						return res.token;
					});
				}
			});
		return verUser;
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
