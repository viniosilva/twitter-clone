import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import InvalidRequestException from '../../application/auth/exception/InvalidRequestException';
import AuthService from '../../application/auth/AuthService';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from './dto/RegisterUserDto';
import DuplicatedException from '../../domain/user/exception/DuplicatedException';
import UserNotFoundException from '../../domain/user/exception/NotFoundException';
import { LoginResponse } from './dto/LoginDto';
import { LoginRequest } from '../../application/auth/dto/LoginDto';

@Controller('/api/auth')
@ApiTags('auth')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: RegisterUserResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid user to create' })
  @ApiConflictResponse({ description: 'User email already exists' })
  async registerUser(
    @Body() request: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    try {
      const response = await this.authService.registerUser(request);
      return response;
    } catch (error) {
      if (error instanceof InvalidRequestException) {
        throw new BadRequestException(error.errors);
      }
      if (error instanceof DuplicatedException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The user was found',
    type: RegisterUserResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid user to find' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async login(
    @Body() request: LoginRequest,
  ): Promise<LoginResponse> {
    try {
      const response = await this.authService.login(request);
      return response;
    } catch (error) {
      if (error instanceof InvalidRequestException) {
        throw new BadRequestException(error.errors);
      }
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
