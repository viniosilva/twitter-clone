import { Module } from '@nestjs/common';
import TweetService from '../../application/tweet/TweetService';
import tweetService from '../../application/tweet';
import TweetController from './TweetController';

@Module({
  controllers: [TweetController],
  providers: [
    { provide: TweetService, useValue: tweetService },
  ],
})
export default class TweetModule {}
