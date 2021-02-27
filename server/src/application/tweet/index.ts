import tweetRepository from '../../domain/tweet';
import TweetDomain from './TweetDomain';
import TweetService from './TweetService';

const tweetDomain = new TweetDomain();

export default new TweetService(tweetDomain, tweetRepository);
