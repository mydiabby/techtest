import { User } from '../../domain/entities/user';
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
    createdAt: {
      name: 'created_at',
      type: 'timestamp with time zone',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP(6)',
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp with time zone',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
      nullable: true,
    },
  },
  uniques: [
    {
      name: 'UNIQUE_FULLNAME',
      columns: ['firstName', 'lastName'],
    },
  ],
  indices: [
    {
      name: 'IDX_FULLNAME',
      columns: ['firstName', 'lastName'],
    },
  ],
});
