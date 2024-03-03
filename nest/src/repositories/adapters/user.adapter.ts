import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';

@Injectable()
export class UserAdapter implements UserService {
    constructor(
        @InjectRepository(UserSchema)
        private usersRepository: Repository<User>,
    ) { }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    addUser(user: CreateUserDto): Promise<User> {
        return this.usersRepository.save(user);
    }

}
