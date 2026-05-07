import { User } from 'src/domain/entities/user';

export const UserServiceKey = 'USER_PORT';

export type SortableField = 'firstName' | 'lastName';
export type SortDirection = 'asc' | 'desc';

export interface GetUsersOptions {
  sortBy?: SortableField;
  sortDir?: SortDirection;
}

export interface UserService {
  getUsers: (options?: GetUsersOptions) => Promise<User[]>;
  findByFirstAndLastName: (
    firstName: string,
    lastName: string,
  ) => Promise<User | null>;
  createUser: (firstName: string, lastName: string) => Promise<User>;
}
