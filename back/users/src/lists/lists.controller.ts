import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addList(
    @Body('name') listName: string,
    @Body('userId') listUserId: string,
    @Body('description') listDescription: string,
    @Body('movies') listMovies: any,
  ) {
    const list = await this.listsService.insertList(
      listUserId,
      listName,
      listDescription,
      listMovies,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'whishlist created successfully',
      data: list,
    };
  }

  /* @UseGuards(JwtAuthGuard)
  @Get()
  async getAllList() {
    const lists = await this.listsService.getLists();
    return lists;
  } */

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getList(@Param('userId') userId: string) {
    return this.listsService.getLists(userId);
  }

  @Patch(':id')
  async updateList(
    @Param('id') listId: string,
    @Body('name') listName: string,
    @Body('description') listDescription: string,
    @Body('movies') listMovies: string,
  ) {
    const list = await this.listsService.updateList(
      listId,
      listName,
      listDescription,
      listMovies,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'list updated successfully',
      list: list,
    };
  }
}
