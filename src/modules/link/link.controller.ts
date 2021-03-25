import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';

import { LinkService } from './link.service';
import { Link } from './linkClass';

@Controller('link')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@Post()
	@UseGuards(AuthGuard)
	createLink(@Body() body: any, @Request() req: any): any /*Promise<Link>*/ {
		const { link } = body;
		link.user = req.user._id;

		return this.linkService.create(link);
	}

	@Get()
	@UseGuards(AuthGuard)
	listAll(@Request() req: any): Promise<Link[]> | any {
		const userId = req.user._id;
		return this.linkService.getAllByUser(userId);
	}

	@Get(':hash')
	listByLink(@Param('hash') hash: string): any {
		return this.linkService.getByHash(hash);
	}
}
