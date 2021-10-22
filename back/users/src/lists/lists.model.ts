import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  movies: { type: Array },
});

export interface List extends mongoose.Document {
  userId: string;
  name: string;
  description: string;
  movies: Array<Object>;
}