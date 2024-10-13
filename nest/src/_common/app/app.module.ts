import { Module } from '@nestjs/common'
import { HealthcheckController } from '../healthcheck/healthcheck.controller'
import { UserModule } from '../../features/user/config/user.module'
import { DatabaseModule } from '../db/database.module'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
    imports: [DatabaseModule, UserModule, CqrsModule.forRoot()],
    controllers: [HealthcheckController],
    providers: [],
    exports: [],
})
export class AppModule {}
