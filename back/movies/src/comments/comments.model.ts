import * as mongoose from 'mongoose';

export const CommentsSchema = new mongoose.Schema({
    movieId: { type: String, required: true},
    userId: { type: String, required: true },
    comment: { type: String, required: true },
});

export interface Comment extends mongoose.Document {
  id: string;
  movieId: string,
  userId: string;
  comment: string;
}