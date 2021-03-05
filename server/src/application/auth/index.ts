import { logger } from '../../infra/logger';
import { apiConfig } from '../../AppConfig';
import user from '../../domain/user';
import AuthDomain from './AuthDomain';
import AuthService from './AuthService';

const authDomain = new AuthDomain(apiConfig.cryptoSecret, apiConfig.jwtSecret, apiConfig.jwtExpiresIn);

export default new AuthService(authDomain, user, logger);
