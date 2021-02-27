import { Module } from '@nestjs/common';
import authService from '../../application/auth';
import AuthService from '../../application/auth/AuthService';
import AuthController from './AuthController';

@Module({
  controllers: [AuthController],
  providers: [{ provide: AuthService, useValue: authService }],
})
export default class AuthModule {}
