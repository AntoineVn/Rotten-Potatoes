import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';


@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }
    
    @Post()
    async addMovie(
        @Body('title') movietitle: string,
        @Body('overview') movieoverview: string,
        @Body('genre_ids') moviegenre_ids: Array<number>,
        @Body('backdrop_path') moviebackdrop_path: string,
        @Body('release_date') movierelease_date: string,
        @Body('vote_average') movievote_average: number,
        @Body('vote_count') movievote_count: number,
        @Body('director') moviedirector: string,
        @Body('role') userRole: string,
    ) {
        if (userRole != 'admin'){
          return {
            message: "user is not admin"
          }
        }
        else
        {
        const movie = await this.moviesService.insertMovie(
            movietitle,
            movieoverview,
            moviegenre_ids,
            moviebackdrop_path,
            movierelease_date,
            movievote_average,
            movievote_count,
            moviedirector,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'movie added successfully',
            data: movie,
        }
      }
    }

    @Get()
    async getAllmovies() {
        const movies = await this.moviesService.getMovies();
        return movies;
    }

    @Get('title/:title')
    async getmovietitle(@Param('title') title: string){
        return this.moviesService.findOne(title);
    }

    @Get(':id')
    async getmovie(@Param('id') movieId: string) {
        return this.moviesService.getSingleMovie(movieId);
    }

    @Get('/genre/:genre_ids')
    getmoviebygenre(@Param('genre_ids') genre_ids: number) {
        return this.moviesService.findMoviesByGenre(genre_ids)
    }

    @Get('/date/:date')
    getmoviebydate(@Param('date') date: string) {
        return this.moviesService.findMoviesByDate(date)
    }

    @Get('/director/:direct')
    getmoviebydirector(@Param('direct') direct: string) {
        return this.moviesService.findMoviesByDirector(direct)
    }

    @Patch(':id')
    async updateMovie(
        @Param('id') movieId: string,
        @Body('title') movietitle: string,
        @Body('overview') movieoverview: string,
        @Body('genre_ids') moviegenre_ids: Array<number>,
        @Body('backdrop_path') moviebackdrop_path: string,
        @Body('release_date') movierelease_date: string,
        @Body('vote_average') movievote_average: number,
        @Body('vote_count') movievote_count: number,
        @Body('comments') moviecomments: Array<Object>,
        @Body('director') moviedirector: string,
    ) {
        const movie = await this.moviesService.updateMovie(
          movieId,
          movietitle,
          movieoverview,
          moviegenre_ids,
          moviebackdrop_path,
          movierelease_date,
          movievote_average,
          movievote_count,
          moviecomments,
          moviedirector,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'movie updated successfully',
            movie: movie,
        };
    }
    

    @Delete(':id')
    async removeMovie(@Param('id') movieId: string) {
        const isDeleted = await this.moviesService.deleteMovie(movieId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'movie deleted successfully',
            };
        }
    }
}