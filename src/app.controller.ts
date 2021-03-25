import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Redirect,
	Req,
	UseInterceptors,
} from '@nestjs/common';

import { FakeIpInterceptor } from './fake-ip.interceptor';
import { GeoIpInterceptor } from './geo-ip.interceptor';
import { LinkService } from './modules/link/link.service';

@Controller()
export class AppController {
	constructor(private readonly linkService: LinkService) {}

	@Get('redirect/:hash')
	@Redirect('', HttpStatus.FOUND)
	@UseInterceptors(FakeIpInterceptor, GeoIpInterceptor)
	redirect(@Param('hash') hash: string): Promise<any> {
		return this.linkService.redirectByHash(hash);
	}
}
