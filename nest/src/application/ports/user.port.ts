import { CreateUserDto } from "src/application/dto/create-user.dto";
import { UpdateUserDto } from "src/application/dto/update-user.dto";
import { User } from "src/domain/entities/user";
import { DeleteResult, UpdateResult } from "typeorm";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: () => Promise<User[]>;
    getOrderedUsers: (orderBy: string) => Promise<User[]>;
    getUserById: (id: number) => Promise<User>;
    getUserByName: (firstName: string, lastName: string) => Promise<User>;
    addUser: (user: CreateUserDto) => Promise<User>;
    updateUser: (id: number, user: UpdateUserDto) => Promise<UpdateResult>;
    deleteUser: (id: number) => Promise<DeleteResult>;
}
