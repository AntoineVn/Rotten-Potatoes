import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  //Insert User
  async insertUser(
    username: string,
    email: string,
    password: string,
    favorite: any,
    lists: any,
    role: string,
    facebookToken: string,
  ) {
    const newUser = new this.UserModel({
      username,
      email,
      password,
      favorite,
      lists,
      role: 'user',
      facebookToken,
    });
    const result = await newUser.save();
    console.log(result);
    return result;
  }

  //Fonction GET users
  async getUsers() {
    const users = await this.UserModel.find().exec();
    return users.map((User) => ({
      id: User.id,
      username: User.username,
      email: User.email,
      password: User.password,
      favorite: User.favorite,
      lists: User.lists,
      role: User.role,
      facebookToken: User.facebookToken,
    }));
  }

  //Fonction GET user => id
  async getSingleUser(UserId: string) {
    const User = await this.findUser(UserId);
    return {
      id: User.id,
      username: User.username,
      email: User.email,
      password: User.password,
      favorite: User.favorite,
      lists: User.lists,
      role: User.role,
      facebookToken: User.facebookToken,
    };
  }

  //Fonction FIND user => id
  private async findUser(id: string): Promise<User> {
    let User;
    try {
      User = await this.UserModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find User.');
    }
    if (!User) {
      throw new NotFoundException('Could not find User.');
    }
    return User;
  }

  //Fonction FIND user => username
  async findOne(username: string): Promise<User | undefined> {
    const user = await this.UserModel.find({ username: username });
    console.log(user);
    if (user.length > 0) {
      return user[0];
    }
  }

  //Fonction FIND user => email
  async findByEmail(username: string): Promise<User | undefined> {
    const user = await this.UserModel.find({ username: username });
    console.log('user service findOneMail ' + user);
    if (user.length > 0) {
      return user[0];
    }
  }

  //Fonction UPDATE user => id
  async updateUser(
    UserId: string,
    username: string,
    email: string,
    password: string,
    favorite: any,
    lists: any,
    role: string,
    facebookToken: string,
  ) {
    const updatedUser = await this.findUser(UserId);
    if (username) {
      updatedUser.username = username;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (favorite) {
      if (updatedUser.favorite == favorite) {
        updatedUser.favorite.slice(favorite.findIndex(), 0);
      } else {
        updatedUser.favorite.push(favorite);
      }
    }
    if (lists) {
      updatedUser.lists = lists;
    }
    if (role) {
      updatedUser.role = role;
    }
    if (facebookToken) {
      updatedUser.facebookToken = facebookToken;
    }
    updatedUser.save();
    return updatedUser;
  }

  //Fonction DELETE user => id
  async deleteUser(UserId: string) {
    const result = await this.UserModel.deleteOne({ _id: UserId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find User.');
    }
    return true;
  }
}
