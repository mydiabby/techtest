import { Controller, Get, Post } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';

@Controller('/users')
export class UserController {

    constructor(private useCase: GetFullNamesOfAllUsers) { }

    @Get('/fullname')
    async getFullNamesOfAllUsers(): Promise<string[]> {
        return await this.useCase.execute();
    }
}
