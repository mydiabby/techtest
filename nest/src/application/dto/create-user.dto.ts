import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Matches, MaxLength, MinLength } from 'class-validator';

function trimString({ value }: any): string {
  return typeof value === 'string' ? value.trim() : value;
}

function toLowerCase({ value }: any): string {
  return typeof value === 'string' ? value.toLowerCase() : value;
}

export class CreateUserDto {
  @ApiProperty({ description: 'Firstname of the user.' })
  @Matches("^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ' -]{1,}|[a-zA-ZÀ-ÿ]+)$")
  @MinLength(2)
  @MaxLength(50)
  @Transform(trimString)
  @Transform(toLowerCase)
  readonly firstName: string;

  @ApiProperty({ description: 'Lastname of the user.' })
  @Matches("^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ' -]{1,}|[a-zA-ZÀ-ÿ]+)$")
  @MinLength(2)
  @MaxLength(50)
  @Transform(trimString)
  @Transform(toLowerCase)
  readonly lastName: string;
}
