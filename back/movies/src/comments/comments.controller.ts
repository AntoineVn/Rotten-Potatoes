import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    async addComment(
        @Body('movieId') commentMovieId: string,
        @Body('userId') commentUserId: string,
        @Body('comment') commentComment: string,
    ) {
        const comment = await this.commentsService.insertComment(
            commentMovieId,
            commentUserId,
            commentComment,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'comment added successfully',
            data: comment,
        };
    }

    @Get()
    async getAllcomments() {
        const comments = await this.commentsService.getComments();
        return comments;
    }

    @Get(':id')
    getcomment(@Param('id') commentId: string) {
        return this.commentsService.getSingleComment(commentId);
    }

    @Get('/movies/:id_movie')
    getmoviecomment(@Param('id_movie') movieId: string) {
        return this.commentsService.findMovieComment(movieId)
    }

    @Patch(':id')
    async updateComment(
        @Param('id') commentId: string,
        @Body('movieId') commentMovieId: string,
        @Body('userId') commentUserId: string,
        @Body('comment') commentComment: string,
    ) {
        const comment = await this.commentsService.updateComment(
            commentId,
            commentMovieId,
            commentUserId,
            commentComment,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'comment updated successfully',
            comment: comment,
        };
    }

    @Delete(':id')
    async removeComment(@Param('id') commentId: string) {
        const isDeleted = await this.commentsService.deleteComment(commentId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'comment deleted successfully',
            };
        }
    }
}