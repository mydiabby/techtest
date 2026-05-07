import { User } from 'src/domain/entities/user';

export class UserResponseDto {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
  ) {}

  static fromEntity(user: User): UserResponseDto {
    return new UserResponseDto(user.id, user.firstName, user.lastName);
  }
}
