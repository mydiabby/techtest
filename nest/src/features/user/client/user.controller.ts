import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { GET_FULL_NAME_OF_ALL_USERS_TOKEN } from '../config/providers/get-full-name-of-all-users.provider'
import { GetFullNamesOfAllUsers } from '../business/use-cases/getFullNameOfAllUsers'
import { UserVM } from '../business/models/user-vm'
import { AddUserCommand } from '../business/use-cases/add-user.handler'
import { CreateUserBody } from './create-user.body'
import { CommandBus } from '@nestjs/cqrs'

@Controller()
export class UserController {
    constructor(
        @Inject(GET_FULL_NAME_OF_ALL_USERS_TOKEN)
        private retrieveFullNamesUsers: GetFullNamesOfAllUsers,
        private readonly _commandBus: CommandBus,
    ) {}

    @Get('/users')
    async getFullNamesOfAllUsers(): Promise<UserVM[]> {
        return await this.retrieveFullNamesUsers.execute()
    }

    @Post('/users')
    async create(@Body() body: CreateUserBody): Promise<void> {
        const command = new AddUserCommand(body.id, body.firstName, body.lastName)
        await this._commandBus.execute(command)
    }
}
