import * as mongoose from 'mongoose';

export const MoviesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  vote_average: { type: Number, required: true},
  vote_count: { type: Number, required: true},
  poster_path: { type: String, required: true},
});

export interface Movie extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  genre: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}