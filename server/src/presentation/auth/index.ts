import authService from '../../application/auth';
import AuthGuard from './AuthGuard';

export const authGuard = new AuthGuard(authService);
