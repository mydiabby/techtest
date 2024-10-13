import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from 'dotenv'
import { TypeormUserSchema } from '../../features/user/infrastructure/typeorm-user.schema'
config()

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env

export const pgConfig: DataSourceOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    migrations: ['./dist/_common/db/migrations/*.js'],
    entities: [TypeormUserSchema],
    synchronize: false,
    migrationsTableName: 'migrations',
}

export default new DataSource(pgConfig)
