import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { PaginationAndOrderQueryDto } from '../common/dto/pagination-order-query.dto/pagination-order-query.dto';

@Injectable()
export class GetAllUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(
    paginationAndOrderQueryDto?: PaginationAndOrderQueryDto,
  ): Promise<[User[], Record<string, number>]> {
    const [users, count] = await this.userService.getUsers(
      paginationAndOrderQueryDto,
    );
    return [users, { count: count }];
  }
}
