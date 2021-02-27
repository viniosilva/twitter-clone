import UserRepository from '../user/UserRepository';
import { IUser } from '../user/UserModel';
import { ITweet } from './TweetSchema';

export default class TweetRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userId: string, tweetDocument: ITweet): Promise<ITweet> {
    let user = await this.userRepository.findById(userId);
    const tweets = user.tweets;

    const _id = tweets.length + 1;
    const tweet: ITweet = { ...tweetDocument, _id };
    tweets.push(tweet);

    await this.userRepository.update(userId, { tweets } as IUser);
    return tweet;
  }
}
