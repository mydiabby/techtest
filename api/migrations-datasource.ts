import { DataSource } from 'typeorm'

export default new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 4002,
    username: 'postgres',
    password: 'postgres',
    database: 'dev',
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'migrations',
})