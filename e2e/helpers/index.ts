import pgp, { IDatabase } from 'pg-promise'
import z from 'zod'
import process from 'node:process'
import { IClient } from 'pg-promise/typescript/pg-subset'
const connectionBuilder = pgp()

type Database = IDatabase<{}, IClient>

const databaseConfigEnvSchema = z.object({
    'DB_HOST': z.string().min(1).default('127.0.0.1'),
    'DB_PORT': z.number({ coerce: true }).min(1).max(65535).default(5432),
    'DB_USERNAME': z.string().min(1),
    'DB_PASSWORD': z.string().min(1),
    'DB_DATABASE': z.string().optional()
}).transform(envVars => ({
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    ...(envVars.DB_DATABASE ? { database: envVars.DB_DATABASE } : {})
}))

const frontendConfigEnvSchema = z.object({
    'FRONTEND_ORIGIN': z.string().url().default('http://127.0.0.1:4000')
        .transform(url => {
            const { origin } = new URL(url)
            return () => new URL(origin)
        })
}).transform(envVars => ({
    origin: envVars['FRONTEND_ORIGIN']
}))

type DatabaseConfig = z.infer<typeof databaseConfigEnvSchema>
type AppConfig = z.infer<typeof frontendConfigEnvSchema>

let databaseConfig: DatabaseConfig|null = null 
let appConfig: AppConfig|null = null
let connection: Database|null = null

async function getDatabaseConfig(): Promise<DatabaseConfig> {
    if (databaseConfig === null)
        databaseConfig = await databaseConfigEnvSchema.parseAsync(process.env)
    return databaseConfig
}

export async function getFrontendConfig(): Promise<AppConfig> {
    if (appConfig === null)
        appConfig = await frontendConfigEnvSchema.parseAsync(process.env)
    return appConfig
}

export async function getDatabaseConnection(): Promise<Database> {
    if (connection === null){
        const options = await getDatabaseConfig()
        connection = connectionBuilder({
            host: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            ...(options.database ? { database: options.database } : {})
        })
    }
    return connection
}