import { Document, Schema } from 'mongoose';
import mongodb from '../../infra/mongodb';

export interface IUser {
  email: string;
  password: string;
}

export type IUserDocument = IUser & Document;

const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongodb.conn.model('User', UserSchema, 'users');
