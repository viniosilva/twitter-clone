import { ApiProperty } from '@nestjs/swagger';
import { LoginRequest as Request, LoginResponse as Response } from '../../../application/auth/dto/LoginDto';
export class LoginRequest implements Request {
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: 'S3CR3T' })
  password: string;
}

export class LoginResponse implements Response {
  @ApiProperty({ example: 'emailExample' })
  token: string;
}
