import { logger } from '../../infra/logger';
import userRepository from '../user';
import TweetRepository from './TweetRepository';

export default new TweetRepository(userRepository, logger);
