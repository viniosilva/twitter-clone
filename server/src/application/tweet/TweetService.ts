import TweetRepository from '../../domain/tweet/TweetRepository';
import { CreateTweetRequest, CreateTweetResponse } from './dto/CreateTweetDto';
import TweetDomain from './TweetDomain';

export default class TweetService {
  constructor(
    private readonly tweetDomain: TweetDomain,
    private readonly tweetRepository: TweetRepository,
  ) {}

  async createTweet(
    userId: string,
    request: CreateTweetRequest,
  ): Promise<CreateTweetResponse> {
    this.tweetDomain.validateRequest(new CreateTweetRequest(request.content));

    const iTweet = this.tweetDomain.buildTweet(request.content);
    const tweet = await this.tweetRepository.create(userId, iTweet);
    return tweet;
  }
}
