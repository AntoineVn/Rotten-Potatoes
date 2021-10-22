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
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('username') userUsername: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('favorite') userFavorite: any,
    @Body('lists') userLists: any,
    @Body('role') userRole: string,
    @Body('facebookToken') userFacebookToken: string,
  ) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userPassword, salt);

    const user = await this.usersService.insertUser(
      userUsername,
      userEmail,
      password,
      userFavorite,
      userLists,
      userRole,
      userFacebookToken,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'user added successfully',
      data: user,
    };
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getAllusers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('username') userUsername: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('favorite') userFavorite: any,
    @Body('lists') userLists: any,
    @Body('role') userRole: string,
    @Body('facebookToken') userFacebookToken: string,
  ) {
    if (userPassword) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(userPassword, salt);

      const user = await this.usersService.updateUser(
        userId,
        userUsername,
        userEmail,
        password,
        userFavorite,
        userLists,
        userRole,
        userFacebookToken,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'user added successfully',
        data: user,
      };
    } else {
      const user = await this.usersService.updateUser(
        userId,
        userUsername,
        userEmail,
        userPassword,
        userFavorite,
        userLists,
        userRole,
        userFacebookToken,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'list updated successfully',
        user: user,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getuser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const isDeleted = await this.usersService.deleteUser(userId);
    if (isDeleted) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
  }
}
