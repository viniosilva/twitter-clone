import { Module } from '@nestjs/common';
import auth from '../../application/auth';
import AuthService from '../../application/auth/AuthService';
import { AuthController } from './AuthController';

@Module({
  controllers: [AuthController],
  providers: [{ provide: AuthService, useValue: auth }],
})
export default class AuthModule {}
