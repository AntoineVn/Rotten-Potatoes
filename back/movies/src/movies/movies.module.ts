import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { MoviesSchema } from './movies.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MoviesSchema }])],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
