import { CreateUserDto } from '@controllers/user.dto';
import { User } from '@domain/entities/user';

export const UserServiceKey = 'USER_PORT';
export interface IUserService {
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  getUsers: () => Promise<User[]>;
  checkIfUserExists: (firstName: string, lastName: string) => Promise<boolean>;
}
