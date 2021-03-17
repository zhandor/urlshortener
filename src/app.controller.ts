import { Controller, Get, Param, Redirect } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	// @Get(':query')
	// @Redirect('', 404)
	// redirect(@Param('query') query: string): any {
	// 	console.log({ query });
	// 	const url = 'https://www.google.com/search?q=' + query;
	// 	return { url: url, statusCode: 301 };
	// }
}
