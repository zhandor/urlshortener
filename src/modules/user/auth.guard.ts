import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const authHeader = req.headers.authorization;
		console.log({ authHeader });
		if (authHeader == null || authHeader == '') {
			throw new UnauthorizedException();
		} else {
			const loggedUser = await this.userService.getByToken(authHeader);

			if (loggedUser == null || typeof loggedUser === 'undefined') {
				throw new UnauthorizedException();
			}
			req.user = loggedUser;

			return true;
		}
	}
}
