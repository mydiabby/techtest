import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationAndOrderQueryDto {
  @ApiProperty({ required: false, description: 'Limit of results' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false, description: 'Offset for pagination' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  offset?: number;

  @ApiProperty({
    required: false,
    description:
      'Comma-separated list of properties to sort by and associated sort order',
    example: 'firstName:DESC,id:ASC',
    default: 'lastName:ASC,firstName:ASC',
  })
  @IsOptional()
  orderBy?: string = 'lastName:ASC,firstName:ASC';
}
