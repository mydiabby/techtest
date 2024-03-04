import { User } from 'src/domain/entities/user';
import { CreateUserDto } from 'src/dto/create-user.dto';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
  getUsers: () => Promise<User[]>;
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  findUser: (createUserDto: CreateUserDto) => Promise<User>;
}
