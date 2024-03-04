import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly lastName?: string;
}