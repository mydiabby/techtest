import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator'

export class CreateUserBody {
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    firstName: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    lastName: string
}
