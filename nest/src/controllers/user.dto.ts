import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
