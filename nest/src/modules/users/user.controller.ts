import { Controller } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  //   @Get('/users')
  //Get Full Names of All Users
  //   async getFullNamesOfAllUsers(): Promise<string[]> {
  //     return await this.userService.execute();
  //   }
}
