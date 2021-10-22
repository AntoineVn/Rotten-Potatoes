import * as mongoose from 'mongoose';

export const MoviesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  genre_ids: { type: Array, required: true },
  backdrop_path: { type: String, required: true},
  release_date: { type: String, required: true },
  vote_average: { type: Number, required: true},
  vote_count: { type: Number, required: true},
  comments: { type: Array },
  director: { type: String, required: true },
});

export interface Movie extends mongoose.Document {
  id: string;
  title: string;
  overview: string;
  genre_ids: Array<number>;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  comments: Array<Object>;
  director: string;
}