import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(
		context: ExecutionContext,
	) {
		const request = context.switchToHttp().getRequest();
		const authorizationHeader: string = request.headers.authorization;

		if (!authorizationHeader) {
			throw new UnauthorizedException();
		}

		const headerSplit = authorizationHeader.split(' ')
		const token = headerSplit[1];

		const user = await this.userService.getByToken(token);

		if (!user) {
			throw new UnauthorizedException();
		}

		request.user = user;

		return true;
	}
}
