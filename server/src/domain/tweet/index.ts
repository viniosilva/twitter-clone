import UserRepository from '../user/UserRepository';
import User from '../user/UserModel';
import TweetRepository from './TweetRepository';

const userRepository = new UserRepository(User);

export default new TweetRepository(userRepository);
