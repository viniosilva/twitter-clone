import { ApiProperty } from '@nestjs/swagger';
import {
  RegisterUserRequest as Request,
  RegisterUserResponse as Response,
} from '../../../domain/auth/dto/RegisterUserDto';

const emailExample = 'test@test.com';

export class RegisterUserRequest implements Request {
  @ApiProperty({ example: emailExample })
  email: string;

  @ApiProperty({ example: 'S3CR3T' })
  password: string;
}

export class RegisterUserResponse implements Response {
  @ApiProperty({ example: emailExample })
  email: string;
}
