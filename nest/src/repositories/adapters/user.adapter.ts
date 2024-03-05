import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
import { UpdateUserDto } from 'src/application/dto/update-user.dto';
import { PaginationAndOrderQueryDto } from 'src/application/common/dto/pagination-order-query.dto/pagination-order-query.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(
    paginationAndOrderQueryDto?: PaginationAndOrderQueryDto,
  ): Promise<[User[], number]> {
    const options: FindManyOptions<User> = {};
    if (paginationAndOrderQueryDto) {
      options.skip = paginationAndOrderQueryDto?.offset;
      options.take = paginationAndOrderQueryDto?.limit;

      options.order = {};
      for (const predicate of paginationAndOrderQueryDto.orderBy.split(',')) {
        const [orderBy, sort] = predicate.split(':');
        if (isNotEmpty(orderBy) && isNotEmpty(sort))
          options.order[orderBy] = sort;
      }
      console.log(options);
      return this.usersRepository.findAndCount({
        ...options,
      });
    }
    return this.usersRepository.findAndCount();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException(`User with id #${id} wasn't found`);
    return user;
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...createUserDto,
    });
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log(id, updateUserDto);
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`User with id #${id} wasn't found`);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    return this.usersRepository.remove(user);
  }
}
