import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginRequest {
  constructor(data: LoginRequest) {
    this.email = data.email;
    this.password = data.password;
  }

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export interface LoginResponse {
  token: string;
}
