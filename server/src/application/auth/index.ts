import user from '../../domain/user';
import AuthDomain from './AuthDomain';
import AuthService from './AuthService';

const authDomain = new AuthDomain();

export default new AuthService(authDomain, user);
