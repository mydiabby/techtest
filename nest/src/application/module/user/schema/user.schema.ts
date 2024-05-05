import { User } from 'src/application/module/user/class/user';
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
  uniques: [
    {
      name: 'UNIQUE_FULLNAME',
      columns: ['firstName', 'lastName'],
    },
  ],
});
