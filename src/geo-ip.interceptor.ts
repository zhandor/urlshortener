import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';

import { tap } from 'rxjs/operators';
import * as geoip from 'geoip-lite';
import { LinkService } from './modules/link/link.service';

@Injectable()
export class GeoIpInterceptor implements NestInterceptor {
	constructor(private readonly linkService: LinkService) {}

	intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest();
		const uri = request.params?.hash;

		const ip = request.ipAddress;
		const geo = geoip.lookup(ip);

		request.geo = geo;
		console.log('GeoIpInterceptor: ', geo);

		return next.handle().pipe(
			tap(async () => {
				console.log('Tap: ')
				const link = await this.linkService.getByHash(uri);
				await this.linkService.saveStats(geo, link._id);
			}),
		);
	}
}
