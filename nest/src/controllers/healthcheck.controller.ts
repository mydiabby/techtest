import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("healthcheck")
@Controller()
export class HealthcheckController {
    constructor() { }

    @Get('/healthcheck')
    healthcheck(): string {
        return 'OK';
    }
}
