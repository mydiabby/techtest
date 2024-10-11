import { Module } from '@nestjs/common';

import { TypeormModule } from './infrastructure/typeorm/typeorm.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeormModule, UserModule],
  controllers: [],
  providers: [],
})
export class TestModule {}
