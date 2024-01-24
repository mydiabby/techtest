import { User } from '@domain/entities/user';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  uniques: [
    {
      name: 'unique_user',
      columns: ['firstName', 'lastName'],
    },
  ],
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
      // capitalize
      transformer: {
        from: (firstName: string) => {
          return firstName;
        },
        to: (firstName: string) => {
          return firstName.charAt(0).toUpperCase() + firstName.slice(1);
        },
      },
    },
    lastName: {
      type: String,
      // uppercase
      transformer: {
        from: (lastName: string) => {
          return lastName;
        },
        to: (lastName: string) => {
          return lastName.toUpperCase();
        },
      },
    },
  },
});
