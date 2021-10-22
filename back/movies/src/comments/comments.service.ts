import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from './comments.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private readonly CommentModel: Model<Comment>) {}

  async insertComment(movieId: string, userId: string, comment: string) {
    const newComment = new this.CommentModel({
      movieId,
      userId,
      comment,
    });
    const result = await newComment.save();
    return result;
  }

  async getComments() {
    const comments = await this.CommentModel.find().exec();
    return comments.map(Comment => ({
      id: Comment.id,
      movieId: Comment.movieId,
      userId: Comment.userId,
      comment: Comment.comment,
    }));
  }

  async getSingleComment(CommentId: string) {
    const Comment = await this.findComment(CommentId);
    return {
      id: Comment.id,
      movieId: Comment.movieId,
      userId: Comment.userId,
      comment: Comment.comment,
    };
  }

  async findMovieComment(movieId: string): Promise<Array<Comment> | undefined> {
    const movieComment = await this.CommentModel.find({movieId: movieId});
    console.log(movieComment)

    const arr = []
    if (movieComment.length > 0) {
      movieComment.forEach(element => {
        arr.push(element)
      });
    } 
    return arr
  }

  async updateComment(CommentId: string, movieId: string, userId: string, comment: string) {
    const updatedComment = await this.findComment(CommentId);
    if (movieId) {
        updatedComment.movieId = movieId;
      }
    if (userId) {
      updatedComment.userId = userId;
    }
    if (comment) {
      updatedComment.comment = comment;
    }
    updatedComment.save();
    return updatedComment;
  }

  async deleteComment(CommentId: string) {
    const result = await this.CommentModel.deleteOne({ _id: CommentId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Comment.');
    }
    return true;
  }

  private async findComment(id: string): Promise<Comment> {
    let Comment;
    try {
      Comment = await this.CommentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Comment.');
    }
    if (!Comment) {
      throw new NotFoundException('Could not find Comment.');
    }
    return Comment;
  }
}