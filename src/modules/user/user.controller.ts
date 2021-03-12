import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './userClass';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	createUser(@Body() body: User): Promise<User> {
		return this.userService.create(body);
	}

	@Post('auth')
	authUser(@Body() body: User): Promise<boolean> {
		return this.userService.authUser(body);
	}

	@Get()
	listAll(): Promise<User[]> {
		console.log('user.controller.ts = getAll');
		return this.userService.getAll();
	}

	@Get(':email')
	listByEmail(@Param('email') email: string): Promise<User> {
		return this.userService.getByEmail(email);
	}

	@Put(':id')
	updateUser(@Param('id') id: string, @Body() body: User): Promise<User> {
		return this.userService.update(id, body);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string): Promise<any> {
		return this.userService.delete(id);
	}
}
