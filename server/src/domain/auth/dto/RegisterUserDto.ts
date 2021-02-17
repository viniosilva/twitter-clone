import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserRequest {
  constructor(data: RegisterUserRequest) {
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

export class RegisterUserResponse {
  email: string;
}
