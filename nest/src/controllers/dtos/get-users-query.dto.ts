import { IsIn, IsOptional } from 'class-validator';
import { SortableField, SortDirection } from 'src/application/ports/user.port';

export class GetUsersQueryDto {
  @IsOptional()
  @IsIn(['firstName', 'lastName'])
  sortBy?: SortableField;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDir?: SortDirection;
}
