import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from './movies.model';

import { CommentsService } from '../comments/comments.service'

@Injectable()
export class MoviesService {
  constructor(@InjectModel('Movie') private readonly MovieModel: Model<Movie>) {}

  async insertMovie (
    title: string,
    overview: string,
    genre_ids: Array<number>,
    backdrop_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number,
    director: string,
    ) 
    {
    const newMovie = new this.MovieModel({
      title,
      overview,
      genre_ids,
      backdrop_path,
      release_date,
      vote_average,
      vote_count,
      director,
    });
    const result = await newMovie.save();
    return result;
  }

  async getMovies() {
    const movies = await this.MovieModel.find().exec();
    return movies.map(Movie => ({
      id: Movie.id,
      title: Movie.title,
      overview: Movie.overview,
      genre_ids: Movie.genre_ids,
      backdrop_path: Movie.backdrop_path,
      release_date: Movie.release_date,
      vote_average: Movie.vote_average,
      vote_count: Movie.vote_count,
      comments: Movie.comments,
      director: Movie.director,
    }));
  }

  async getSingleMovie(MovieId: string) {
    const Movie = await this.findMovie(MovieId);
    return {
      id: Movie.id,
      title: Movie.title,
      overview: Movie.overview,
      genre_ids: Movie.genre_ids,
      backdrop_path: Movie.backdrop_path,
      release_date: Movie.release_date,
      vote_average: Movie.vote_average,
      vote_count: Movie.vote_count,
      comments: Movie.comments,
      director: Movie.director,
    };
  }

  async findOne(title: string): Promise<Array<Movie> | undefined> {
    const movie = await this.MovieModel.find({ title: title });
    if (movie.length > 0) {
      return movie
    }
  }

  async findMoviesByGenre(genre_ids: number): Promise<Array<Movie> | undefined> {
    const movies = await this.getMovies()

    const arr = []
    if (movies.length > 0) {
      movies.forEach(element => {
        var temp = element.genre_ids[0][0]
        if (temp != undefined){
          console.log(Object.getOwnPropertyNames(temp))
          console.log(temp.id)
          if (temp.id == genre_ids){
            arr.push(element)
          }
        }
      });
    }
    console.log(arr)
    return arr
  }

  async findMoviesByDate(date: string): Promise<Array<Movie> | undefined> {
    const movies = await this.getMovies()

    const arr = []
    if (movies.length > 0){
      movies.forEach(element => {
        if (element.release_date == date)
        arr.push(element)
      });
    }
    return arr
  }

  async findMoviesByDirector(direct: string): Promise<Array<Movie> | undefined> {
    const movies = await this.getMovies()

    const arr = []
    if (movies.length > 0){
      movies.forEach(element => {
        if (element.director == direct)
        arr.push(element)
      });
    }
    return arr
  }
  

  async updateMovie (
    MovieId: string,
    title: string,
    overview: string,
    genre_ids: Array<number>,
    backdrop_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number,
    comments: Array<Object>,
    director: string,
    )
    {
    const updatedMovie = await this.findMovie(MovieId);
    if (title) {
      updatedMovie.title = title;
    }
    if (overview) {
      updatedMovie.overview = overview;
    }
    if (genre_ids) {
      updatedMovie.genre_ids = genre_ids;
    }
    if (backdrop_path) {
      updatedMovie.backdrop_path = backdrop_path;
    }
    if (release_date) {
      updatedMovie.release_date = release_date;
    }
    if (vote_average) {
      updatedMovie.vote_average = vote_average;
    }
    if (vote_count) {
      updatedMovie.vote_count = vote_count;
    }
    if (comments) {
      updatedMovie.comments.push(comments);
    }
    if (director) {
      updatedMovie.director = director;
    }
    updatedMovie.save();
    return updatedMovie;
  }

  async deleteMovie(MovieId: string) {
    const result = await this.MovieModel.deleteOne({ _id: MovieId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Movie.');
    }
    return true;
  }

  private async findMovie(id: string): Promise<Movie> {
    let Movie;
    try {
      Movie = await this.MovieModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Movie.');
    }
    if (!Movie) {
      throw new NotFoundException('Could not find Movie.');
    }
    return Movie;
  }
}