import { IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
