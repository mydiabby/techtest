import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { pgConfig } from './typeorm-config'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...pgConfig,
            autoLoadEntities: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
