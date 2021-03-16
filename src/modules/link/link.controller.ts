import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { LinkService } from './link.service';
import { Link } from './linkClass';

import { User } from '../user/userClass';
@Controller('link')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@Post()
	createLink(@Body() body: any): any /*Promise<Link>*/ {
		const { user } = body;
		const { link } = body;
		link.user = user;

		return this.linkService.create(link);
	}

	@Get()
	listAll(): Promise<Link[]> {
		return this.linkService.getAll();
	}

	@Get(':hash')
	listByLink(@Param('hash') hash: string): any {
		return this.linkService.getByHash(hash);
	}
}
