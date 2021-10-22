import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsSchema } from './comments.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentsSchema }])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}