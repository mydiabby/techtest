import { Module } from '@nestjs/common'
import { HealthcheckController } from './common/application/healthcheck/healthcheck.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './users/di/user.module'
import { Configuration } from './configuration/configuration'
import { ConfigurationModule } from './configuration/di/configuration.module'
import { CONFIGURATION } from './configuration/di/configuration.tokens'
import { APP_FILTER } from '@nestjs/core'
import { CommonModule } from './common/di/common.module'
import { GlobalExceptionFilter } from './common/application/rest/filters/global.filter'

@Module({
    imports: [
        CommonModule,
        UserModule,
        TypeOrmModule.forRootAsync({
            useFactory: (config: Configuration) => {
                const { database: db } = config
                return {
                    type: 'postgres',
                    host: db.host,
                    port: db.port,
                    username: db.username,
                    password: db.password,
                    ...(typeof db.database === 'string' ? { database: db.database } : {}),
                    ...(typeof db.schema === 'string' ? { schema: db.schema } : {}),
                    autoLoadEntities: true,
                    migrationsRun: db.migrate,
                    migrationsTableName: 'migrations',
                    migrations: ['dist/migrations/**/*.js'],
                    synchronize: false
                }
            },
            imports: [ConfigurationModule],
            inject: [CONFIGURATION]
        }),
    ],
    controllers: [
        HealthcheckController
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter
        }
    ],
})
export class AppModule {}
