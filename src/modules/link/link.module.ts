import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import LinkSchema from './link.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }])],
	controllers: [LinkController],
	providers: [LinkService],
})
export class LinkModule {}
