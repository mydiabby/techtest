import { User } from 'src/application/module/user/class/user';

import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  findUser: (findUserDto: FindUserDto) => Promise<User>;
  getUsers: () => Promise<User[]>;
}
