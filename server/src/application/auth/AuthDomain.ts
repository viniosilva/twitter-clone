import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { validateSync } from 'class-validator';
import { IUser } from '../../domain/user/UserModel';
import JwtPayload from './dto/JwtPayload';
import InvalidRequestException from './exception/InvalidRequestException';

export default class AuthDomain {
  constructor(
    private readonly cryptoSecret: string,
    private readonly jwtSecret: string,
    private readonly jwtExpiresIn: number,
  ) {}

  validateRequest(request: unknown): void {
    const validationErrors = validateSync(request);

    if (validationErrors.length > 0) {
      const errors = validationErrors.map((error) =>
        Object.values(error.constraints),
      );
      throw new InvalidRequestException([].concat(...errors));
    }
  }

  buildUserRegister(email: string, password: string): IUser {
    return {
      _id: undefined,
      email: email,
      password: this.encrypt(password),
      tweets: [],
    };
  }

  encrypt(value: string): string {
    const encryptedValue = crypto
      .createHmac('sha256', this.cryptoSecret)
      .update(value)
      .digest('hex');

    return encryptedValue;
  }

  generateToken(userId: string): string {
    const payload: JwtPayload = { userId };

    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
    return token;
  }

  getUserIdFromJwtAuthorization(authorization: string): string {
    const token = this.getJwtFromAuthorization(authorization);
    const payload = jwt.verify(token, this.jwtSecret) as JwtPayload;

    return payload.userId;
  }

  private getJwtFromAuthorization(authorization: string): string {
    return authorization.split(/\s/)[1];
  }
}
