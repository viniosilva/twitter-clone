import AuthDomain from './AuthDomain';
import AuthService from './AuthService';
import UserRepository from './UserRepository';
import UserSchema from './UserSchema';

const authDomain = new AuthDomain();
const userRepository = new UserRepository(UserSchema);

export default new AuthService(authDomain, userRepository);
