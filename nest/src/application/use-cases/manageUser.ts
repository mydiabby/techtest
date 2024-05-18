import {Injectable, Inject} from "@nestjs/common";
import {UserService, UserServiceKey} from "@ports/user.port";
import {User} from "@entities/user";
import {CreateUserDTO} from "@dto/create-user";
import {UpdateUserDTO} from "@dto/update-user";
import {PaginationParams} from "@shared/types/pagination";

@Injectable()
export class ManageUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService
  ) {
  }

  async execute(params: PaginationParams): Promise<{ users: User[], totalUserCount: number }> {
    const {users, totalUserCount} = await this.userService.getUsers(params);
    return {users, totalUserCount};
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.getUserWithFullNameToLowerCase(createUserDTO);
    return this.userService.addUser(user);
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = this.getUserWithFullNameToLowerCase(updateUserDTO);
    return this.userService.updateUser(user);
  }

  private getUserWithFullNameToLowerCase<T extends CreateUserDTO | UpdateUserDTO>(userDto: T): T {
    userDto.firstName = userDto.firstName.trim().toLowerCase();
    userDto.lastName = userDto.lastName.trim().toLowerCase();
    return userDto;
  }

  async delete(userId: number): Promise<void> {
    try {
      await this.userService.deleteUser(userId);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}
