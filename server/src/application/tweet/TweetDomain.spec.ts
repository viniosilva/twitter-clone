import TweetDomain from './TweetDomain';
import { CreateTweetRequest } from './dto/CreateTweetDto';

describe('TweetDomain', () => {
  let tweetDomain: TweetDomain;

  beforeEach(() => {
    tweetDomain = new TweetDomain();
  });

  describe('validateRequest', () => {
    it('should be successfully', () => {
      const request = new CreateTweetRequest('test');
      tweetDomain.validateRequest(request);
    });

    it('should throw InvalidRequestException', () => {
      const request = new CreateTweetRequest('');

      try {
        tweetDomain.validateRequest(request);
      } catch (error) {
        expect(error.errors).toMatchObject([
          'content must be longer than or equal to 1 characters',
          'content should not be empty',
        ]);
      }
    });
  });

  describe('buildTweet', () => {
    it('should return successfully', () => {
      const tweet = tweetDomain.buildTweet('test');
      expect(tweet).toMatchObject({
        content: 'test',
        createdAt: expect.any(Date),
        likes: [],
      });
    });
  });
});
