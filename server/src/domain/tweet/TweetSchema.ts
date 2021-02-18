import { Document, Schema } from 'mongoose';

export interface ITweet {
  content: string;
  likes: string[];
}

export type ITweetDocument = ITweet & Document;

export const TweetSchema = new Schema<ITweetDocument>(
  {
    content: { type: String, required: true },
    likes: [String],
  },
  { autoIndex: false },
);
