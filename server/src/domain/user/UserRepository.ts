import { Model } from 'mongoose';
import DuplicatedException from './exception/DuplicatedException';
import NotFoundException from './exception/NotFoundException';
import { IUser, IUserDocument } from './UserSchema';

export default class UserRepository {
  constructor(private readonly user: Model<IUserDocument>) {}

  async create(userDocument: IUser): Promise<IUser> {
    try {
      const user = await this.user.create(userDocument);
      return user;
    } catch (error) {
      if (error.code === 11000) throw new DuplicatedException();
      throw error;
    }
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<IUser> {
    const user = await this.user.findOne({ email, password }).exec();

    if (!user) throw new NotFoundException();
    return user;
  }
}
