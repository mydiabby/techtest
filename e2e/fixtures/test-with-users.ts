import { getDatabaseConnection } from '../helpers'
import { User } from '../models/user'
import { test as base } from '@playwright/test'

type RequestedUser = {
    firstname: string
    lastname: string
}

type UsersFixtures = Readonly<{
    users: readonly User[]
}>

export type UserRecord = Readonly<{
    id: number
    firstname: string
    lastname: string
}>

export const testWithUsers = (requestedUsers: readonly RequestedUser[]) => base.extend<UsersFixtures>({
    users: [
        async ({ page: _page }, use) => {
            const database = await getDatabaseConnection()
            const users = await database.tx(async tx => {
                await tx.result('TRUNCATE TABLE users')
                const users = []
                for (const requestedUser of requestedUsers){
                    const id = await tx.one(
                        'INSERT INTO users (firstname, lastname) VALUES (${firstname}, ${lastname}) RETURNING id',
                        requestedUser,
                        value => +value.id
                    )
                    users.push({
                        ...requestedUser,
                        id
                    })
                }
                return users
            })
            await use(users)
        },
        { auto: true }
    ]
})