import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@ports/user.port';
import { User } from '@entities/user';
import { UserSchema } from '@schemas/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(
    sortBy: string = "firstName",
    sortOrder: "ASC" | "DESC" = "ASC",
    page: number = 1,
    perPage: number = 10
  ): Promise<{ users: User[]; totalUserCount: number }> {
    try {
      const skip = (page - 1) * perPage;
      const order = {};
      order[sortBy] = sortOrder;

      const [users, totalCount] = await this.usersRepository.findAndCount({
        order,
        skip,
        take: perPage
      });

      return { users, totalUserCount: totalCount };
    } catch (error) {
      throw new HttpException("Failed to fetch users", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
