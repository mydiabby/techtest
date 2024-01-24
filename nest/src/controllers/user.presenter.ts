import { User } from '@domain/entities/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
