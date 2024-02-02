import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
