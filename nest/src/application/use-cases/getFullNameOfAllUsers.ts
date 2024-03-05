import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { PaginationAndOrderQueryDto } from '../common/dto/pagination-order-query.dto/pagination-order-query.dto';

@Injectable()
export class GetFullNamesOfAllUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(
    paginationAndOrderQueryDto?: PaginationAndOrderQueryDto,
  ): Promise<[string[], Record<string, number>]> {
    const [users, count] = await this.userService.getUsers(
      paginationAndOrderQueryDto,
    );
    return [this.getListOfFullNamesOfUser(users), { count: count }];
  }

  getListOfFullNamesOfUser(users: User[]): string[] {
    return users.map((user) => user.getFullName());
  }
}
