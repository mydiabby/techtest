import { IsNotEmpty } from 'class-validator';
import { CreateUserDTO } from '@dto/create-user';

export class UpdateUserDTO extends CreateUserDTO {
  @IsNotEmpty()
  id: number;
}
