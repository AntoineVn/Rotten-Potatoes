import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorite: {type: Array},
  lists: {type: Array},
  role: {type: String},
  facebookToken: { type: String },
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  password: string;
  favorite: any;
  lists: any;
  role: string;
  facebookToken: string;
}