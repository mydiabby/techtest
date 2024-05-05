import { Module } from '@nestjs/common';

import { HealthcheckController } from './controller/healthcheck.controller';

@Module({
  controllers: [HealthcheckController],
})
export class CoreModule {}
