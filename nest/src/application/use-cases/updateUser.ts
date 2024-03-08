import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userService.updateUser(+id, updateUserDto);
    return user;
  }
}
