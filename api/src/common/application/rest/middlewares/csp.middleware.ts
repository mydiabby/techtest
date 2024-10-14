import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {

    constructor(private readonly cspExcludePaths: readonly string[]){}
    
    use(req: Request, res: Response, next: NextFunction): void {

        if (!this.cspExcludePaths.includes(req.path)){
            res.setHeader('Content-Security-Policy', 'default-src: none;')
        }

        Object.entries({
            'X-Frame-Options': 'DENY',
            'X-Download-Options': 'noopen',
            'X-Content-Type-Options': 'nosniff',
            // works all the time lol
            'Server': 'Apache/2.4.48 (Unix) PHP/7.4.21'
        }).forEach(([name, value]) => res.setHeader(name, value))

        next()
    }
}