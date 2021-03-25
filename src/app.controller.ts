import { Controller, Get, HttpStatus, Param, Redirect } from '@nestjs/common';

import { LinkService } from './modules/link/link.service';

@Controller()
export class AppController {
	constructor(private readonly linkService: LinkService) {}

	@Get('r/:hash')
	@Redirect('', HttpStatus.NOT_FOUND)
	redirect(@Param('hash') hash: string): /*Promise<any> |*/ any {
		console.log({ hash });
		return this.linkService.redirectByHash(hash);
	}
}
