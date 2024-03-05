import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
import { UpdateUserDto } from 'src/application/dto/update-user.dto';

@Injectable()
export class UserAdapter implements UserService {
    constructor(
        @InjectRepository(UserSchema)
        private usersRepository: Repository<User>,
    ) { }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getOrderedUsers(orderBy: string): Promise<User[]> {
        return this.usersRepository.find({
            order: {
                [orderBy]: 'ASC'
            }
        });
    }

    getUserById(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id: `${id}` });
    }

    getUserByName(firstName: string, lastName: string): Promise<User> {
        return this.usersRepository.findOneBy({ firstName, lastName });
    }

    addUser(user: CreateUserDto): Promise<User> {
        return this.usersRepository.save(user);
    }

    updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult> {
        return this.usersRepository.update(id, user);
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }


}
