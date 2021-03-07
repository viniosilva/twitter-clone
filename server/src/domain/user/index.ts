import UserRepository from './UserRepository';
import UserModel from './UserModel';
import { logger } from '../../infra/logger';

export default new UserRepository(UserModel, logger);
