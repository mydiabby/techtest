import { Controller, Get } from '@nestjs/common'

@Controller('/health')
export class HealthcheckController {
    constructor() { }

    @Get()
    healthcheck(): string {
        return 'OK'
    }
}
