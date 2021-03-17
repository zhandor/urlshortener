import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';

import { LinkService } from './link.service';
import { Link } from './linkClass';

import { AuthGuard } from '../user/auth.guard';
@Controller('link')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@Post()
	@UseGuards(AuthGuard)
	createLink(@Req() req: any, @Body() body: any): any /*Promise<Link>*/ {
		const { user } = req;
		const { link } = body;
		link.user = user._id;

		console.log('createLink:', link)
		return this.linkService.create(link);
	}

	@Get()
	@UseGuards(AuthGuard)
	listAll(@Req() req: any): Promise<Link[]> {
		const id: string = req.user._id;
		return this.linkService.getAll(id);
	}

	@Get(':hash')
	listByLink(@Param('hash') hash: string): any {
		return this.linkService.getByHash(hash);
	}
}
