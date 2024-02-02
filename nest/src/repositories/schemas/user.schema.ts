import { User } from 'src/domain/entities/user';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  indices: [
    {
      name: 'unique_combination',
      unique: true,
      columns: ['firstName', 'lastName'],
    },
  ],
});
