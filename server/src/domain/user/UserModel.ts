import { Document, Schema } from 'mongoose';
import mongodb from '../../infra/mongodb';
import { ITweet, TweetSchema } from '../tweet/TweetSchema';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  tweets: ITweet[];
}

export type IUserDocument = IUser & Document;

const UserModel = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tweets: [TweetSchema],
});

export default mongodb.conn.model('User', UserModel, 'users');
