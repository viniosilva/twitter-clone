import UserRepository from '../user/UserRepository';
import { IUser } from '../user/UserModel';
import { ITweet } from './TweetSchema';
import { Logger } from 'pino';

export default class TweetRepository {
  constructor(private readonly userRepository: UserRepository, private readonly logger: Logger) {}

  async create(userId: string, tweet: ITweet): Promise<ITweet> {
    const user = await this.userRepository.findById(userId);
    const tweets = user.tweets;
    const _id = tweets.length + 1;
    const iTweet: ITweet = { ...tweet, _id };
    tweets.push(iTweet);
    await this.userRepository.update(userId, { tweets } as IUser);
    this.logger.child({ tweet: iTweet }).debug('Tweet created');

    return iTweet;
  }

  async removeById(userId: string, tweetId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const tweets = user.tweets.filter(({ _id }) => _id !== tweetId);
    await this.userRepository.update(userId, { tweets } as IUser);
    this.logger.child({ tweetId, userId }).debug('Tweet removed');
  }
}
