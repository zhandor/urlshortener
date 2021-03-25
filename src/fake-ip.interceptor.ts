import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import * as faker from 'faker';

@Injectable()
export class FakeIpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ip = faker.internet.ip();
		console.log('FakeIpInterceptor: ', ip)
		const request = context.switchToHttp().getRequest();

		request.ipAddress = ip;

    return next.handle();
  }
}
