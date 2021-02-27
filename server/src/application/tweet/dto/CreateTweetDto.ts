import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ITweet } from '../../../domain/tweet/TweetSchema';

export class CreateTweetRequest {
  constructor(content: string) {
    this.content = content;
  }

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  content: string;
}

export type CreateTweetResponse = ITweet;
