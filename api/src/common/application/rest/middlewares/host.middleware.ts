import { ForbiddenException, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class HostMiddleware implements NestMiddleware {
    constructor(private readonly allowedHosts: readonly string[]){}

    use(req: Request, res: Response, next: NextFunction): void {

        if (this.allowedHosts.includes(req.hostname)){
            next()
            return
        }

        next(new ForbiddenException(`unknown host "${req.hostname}"`))
    }
}