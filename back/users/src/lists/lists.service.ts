import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List } from './lists.model';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel('List') private readonly ListModel: Model<List>) {}

  async insertList(userId: string, name: string, description: string, movies: any) {
    const newList = new this.ListModel({
      userId,
      name,
      description,
      movies,
    });
    const result = await newList.save();
    console.log(result);
    return result;
  }

  async getLists(userId: string) {
    const lists = await this.ListModel.find({ userId: userId }).exec();
    return lists.map((List) => ({
      id: List.id,
      userId: List.userId,
      name: List.name,
      description: List.description,
      movies: List.movies,
    }));
  }

  async findOne(name: string): Promise<List | undefined> {
    const list = await this.ListModel.find({ name: name });
    console.log(list);
    if (list.length > 0) {
      return list[0];
    }
  }

  async updateList(
    ListId: string,
    name: string,
    description: string,
    movies: any,
  ) {
    const updatedList = await this.findList(ListId);
    if (name) {
      updatedList.name = name;
    }
    if (description) {
      updatedList.description = description;
    }
    if (movies) {
      updatedList.movies.push(movies)
    }

    updatedList.save();
    return updatedList;
  }

  async deleteList(ListId: string) {
    const result = await this.ListModel.deleteOne({ _id: ListId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find List.');
    }
    return true;
  }

  private async findList(id: string): Promise<List> {
    let List;
    try {
      List = await this.ListModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find List.');
    }
    if (!List) {
      throw new NotFoundException('Could not find List.');
    }
    return List;
  }
}
