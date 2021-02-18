import { ApiProperty } from '@nestjs/swagger';
import {
  LoginRequest as Request,
  LoginResponse as Response,
} from '../../../application/auth/dto/LoginDto';

const emailExample = 'test@test.com';

export class LoginRequest implements Request {
  @ApiProperty({ example: emailExample })
  email: string;

  @ApiProperty({ example: 'S3CR3T' })
  password: string;
}

export class LoginResponse implements Response {
  @ApiProperty({ example: emailExample })
  email: string;
}
