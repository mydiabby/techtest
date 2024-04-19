import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostUserDto {
  @IsNotEmpty({ message: 'First Name is required' })
  @Transform((firstName) => (firstName.value[0].toUpperCase() + firstName.value.substr(1).toLowerCase()).trim())
  firstName: string;

  @IsNotEmpty({ message: 'Last Name is required' })
  @Transform((lastName) => lastName.value.toUpperCase().trim())
  lastName: string;
}
