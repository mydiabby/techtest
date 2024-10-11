import { IsString } from 'class-validator';

export class UserCreateInput {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}
