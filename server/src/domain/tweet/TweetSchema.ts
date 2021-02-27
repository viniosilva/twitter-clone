import { Document, Schema } from 'mongoose';

export interface ITweet {
  _id: number;
  content: string;
  likes: string[];
  createdAt: Date;
}

export type ITweetDocument = ITweet & Document;

export const TweetSchema = new Schema<ITweetDocument>(
  {
    _id: { type: Number, required: true, index: true },
    content: { type: String, required: true },
    likes: [String],
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { autoIndex: false },
);
