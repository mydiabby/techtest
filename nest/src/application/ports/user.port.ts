import { User } from "@entities/user";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: (sortBy?: string, sortOrder?: "ASC" | "DESC") => Promise<{ totalUserCount: number; users: User[] }>;
}
