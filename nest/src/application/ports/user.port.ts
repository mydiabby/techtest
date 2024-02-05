import { User } from 'src/domain/entities/user';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
  getUsers: () => Promise<User[]>;

  getUser: (user: User) => Promise<User>;

  postUser: (user: User) => void;
}
