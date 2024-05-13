import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@ports/user.port';
import { User } from '@entities/user';
import { UserSchema } from '@schemas/user.schema';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '@dto/create-user';
import { PaginationParams } from '@shared/types/pagination';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(params: PaginationParams = {} ): Promise<{ users: User[]; totalUserCount: number }> {
    const { page = 1, perPage = 10,order } = params;
    try {
      const skip = (page - 1) * perPage;

      const [users, totalCount] = await this.usersRepository.findAndCount({
        order: JSON.parse(order),
        skip,
        take: perPage
      });

      return { users, totalUserCount: totalCount };
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { firstName, lastName } = createUserDTO;

    const existingUser = await this.usersRepository.findOne({
      where: {
        firstName,
        lastName
      }
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.usersRepository.save(createUserDTO);
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
