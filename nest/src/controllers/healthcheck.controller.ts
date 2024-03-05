import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck 🏥')
@Controller('healthcheck')
export class HealthcheckController {
  constructor() {}

  @Get('')
  @ApiOkResponse({
    type: String,
    isArray: false,
  })
  healthcheck(): string {
    return 'OK';
  }
}
