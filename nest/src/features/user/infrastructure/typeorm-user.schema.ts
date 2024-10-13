import { EntitySchema } from 'typeorm'
import { User } from '../business/models/user'

export const TypeormUserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: 'uuid',
            primary: true,
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
            name: 'unicity_user_first_last_name',
            columns: ['firstName', 'lastName'],
        },
    ],
})
