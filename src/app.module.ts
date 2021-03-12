import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { LinkModule } from './modules/link/link.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb://localhost:27017/URL-shortner?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
		),
		UserModule,
		LinkModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
