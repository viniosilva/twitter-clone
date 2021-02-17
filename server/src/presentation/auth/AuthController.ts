import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import InvalidRequestException from '../../application/auth/exception/InvalidRequestException';
import AuthService from '../../application/auth/AuthService';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from './dto/RegisterUserDto';
import DuplicatedException from '../../domain/user/exception/DuplicatedException';

@Controller('/api/auth')
@ApiTags('auth')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class AuthController {
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
}
