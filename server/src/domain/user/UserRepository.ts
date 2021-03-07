import { Model } from 'mongoose';
import { Logger } from 'pino';
import DuplicatedException from './exception/DuplicatedException';
import NotFoundException from './exception/NotFoundException';
import { IUser, IUserDocument } from './UserModel';

export default class UserRepository {
  constructor(private readonly user: Model<IUserDocument>, private readonly logger: Logger) {}

  async create(user: IUser): Promise<IUser> {
    try {
      const userDocument = await this.user.create(user);
      const iUser: IUser = { ...user, _id: userDocument._id, password: '******' };
      this.logger.child({ user: iUser }).debug('User created');

      return iUser;
    } catch (error) {
      if (error.code === 11000) throw new DuplicatedException();
      throw error;
    }
  }

  async findByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const user = await this.user.findOne({ email, password }).exec();

    if (!user) throw new NotFoundException();
    return user;
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.user.findById(id).exec();
    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, user: IUser): Promise<IUser> {
    const userDocument = await this.user.findByIdAndUpdate(id, user, { new: true }).exec();
    if (!userDocument) throw new NotFoundException();

    const iUser: IUser = { ...user, _id: id, password: '******' };
    this.logger.child({ user: iUser }).debug('User updated');

    return iUser;
  }
}
