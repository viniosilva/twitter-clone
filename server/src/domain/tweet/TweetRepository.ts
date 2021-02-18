import { Model } from 'mongoose';
import { ITweet, ITweetDocument } from './TweetSchema';

export default class TweetRepository {
  constructor(private readonly tweet: Model<ITweetDocument>) {}

  async create(tweetDocument: ITweet): Promise<ITweet> {
    const tweet = await this.tweet.create(tweetDocument);
    return tweet;
  }
}
