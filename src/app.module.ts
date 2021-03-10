import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forRoot(
			'mongodb://localhost:27017/URL-shortner?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
		),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
