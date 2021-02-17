import { validateSync } from 'class-validator';
import AuthDomain from './AuthDomain';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from './dto/RegisterUserDto';
import UserRepository from './UserRepository';

export default class AuthService {
  constructor(
    private readonly authDomain: AuthDomain,
    private readonly userRepository: UserRepository,
  ) {}

  async registerUser(
    request: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    this.authDomain.validateRequest(new RegisterUserRequest(request));

    const user = await this.userRepository.create(request);
    return { email: user.email };
  }
}
