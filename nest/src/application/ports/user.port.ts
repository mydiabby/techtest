import { User } from 'src/domain/entities/user';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
  getUsers: () => Promise<User[]>;
  findByFirstAndLastName: (
    firstName: string,
    lastName: string,
  ) => Promise<User | null>;
  createUser: (firstName: string, lastName: string) => Promise<User>;
}
