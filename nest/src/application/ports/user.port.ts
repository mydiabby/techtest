import { User } from 'src/domain/entities/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationAndOrderQueryDto } from '../common/dto/pagination-order-query.dto/pagination-order-query.dto';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
  getUsers: (
    paginationAndOrderQueryDto?: PaginationAndOrderQueryDto,
  ) => Promise<[User[], number]>;
  getUser: (id: number) => Promise<User>;
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  updateUser: (id: number, updateUserDto: UpdateUserDto) => Promise<User>;
  deleteUser: (id: number) => Promise<User>;
}
