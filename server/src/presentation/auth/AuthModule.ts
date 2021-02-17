import { Module } from '@nestjs/common';
import auth from '../../domain/auth';
import AuthService from '../../domain/auth/AuthService';
import { AuthController } from './AuthController';

@Module({
  controllers: [AuthController],
  providers: [{ provide: AuthService, useValue: auth }],
})
export default class AuthModule {}
