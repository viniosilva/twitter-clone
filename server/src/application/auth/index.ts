import { apiConfig } from '../../AppConfig';
import userRepository from '../../domain/user';
import AuthDomain from './AuthDomain';
import AuthService from './AuthService';

const authDomain = new AuthDomain(apiConfig.cryptoSecret, apiConfig.jwtSecret, apiConfig.jwtExpiresIn);

export default new AuthService(authDomain, userRepository);
