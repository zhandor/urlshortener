import { Controller, Get, Param, Redirect } from '@nestjs/common';

import { AppService } from './app.service';
import { LinkService } from './modules/link/link.service';

@Controller()
export class AppController {
	constructor(private readonly linkService: LinkService) {}

	@Get('redirect/:hash')
	@Redirect('', 404)
	async redirect(@Param('hash') hash: string): Promise<any> {
		console.log({ hash });
		const link = await this.linkService.getByHash(hash).then((result) => {
			return result;
		});
		const url = link.url_source;
		return { url: url, statusCode: 301 };
	}
}
