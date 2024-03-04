import { IsOptional, IsString } from "class-validator";

export class GetUsersQueryStringDto {
    @IsOptional()
    @IsString()
    orderBy?: string;
}