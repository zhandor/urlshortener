import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import LinkSchema from './link.schema';
import { UserModule } from '../user/user.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }]), UserModule],
	controllers: [LinkController],
	providers: [LinkService],
})
export class LinkModule {}
