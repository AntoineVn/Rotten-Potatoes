import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { ListSchema } from './lists.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
