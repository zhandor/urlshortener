import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { LinkService } from './link.service';
import { Link } from './linkClass';

@Controller('link')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@Post()
	createLink(@Body() body: Link): Promise<Link> {
		return this.linkService.create(body);
	}

	@Get()
	listAll(): Promise<Link[]> {
		return this.linkService.getAll();
	}

	@Get(':link')
	listByLink(@Param('link') link: string): Promise<Link> {
		return this.linkService.getByLink(link);
	}
}
