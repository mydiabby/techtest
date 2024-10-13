import { config } from 'dotenv'
import { exit } from 'process'
import { DataSource } from 'typeorm'
import { usersFixtures } from './users.fixtures'
import { pgConfig } from '../db/typeorm-config'

class Seeders {
    constructor(private readonly _pg: DataSource) {}

    async seed() {
        await this._pg.createQueryBuilder().insert().into('user').values(usersFixtures).execute()
    }

    async clear() {
        await this._pg.createQueryBuilder().delete().from('user').execute()
    }
}

export const main = async () => {
    let exitCode = 0
    config()
    const pg = await new DataSource(pgConfig).initialize()

    try {
        const seeders = new Seeders(pg)
        await seeders.clear()
        await seeders.seed()

        console.log('Successfully seeded database !')
    } catch (e) {
        console.error(`Seed Db failed with error: ${e}`, { e })
        exitCode = 1
    } finally {
        await pg.destroy()
    }
    return exitCode
}

main().then((exitCode) => {
    exit(exitCode)
})
