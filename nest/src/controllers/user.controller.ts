import {Controller, Get} from '@nestjs/common';
import { GetFullNamesOfAllUsers } from '@use-cases/getFullNameOfAllUsers';

@Controller('users')
export class UserController {
  constructor(
    private useCaseListUsersSortedByName: GetFullNamesOfAllUsers,
  ) { }

  @Get('')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCaseListUsersSortedByName.execute();
  }
}
