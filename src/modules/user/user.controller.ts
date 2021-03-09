import { Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAll(): any {
		console.log('user.controller.ts = getAll');
		return this.userService.getAll();
	}

	@Post()
	createUser(): string {
		return this.userService.getInfo();
	}
}
