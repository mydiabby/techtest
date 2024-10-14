import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Configuration } from './configuration/configuration'
import { CONFIGURATION } from './configuration/di/configuration.tokens'
import { NestExpressApplication } from '@nestjs/platform-express'
import { setupOpenApi } from './common/application/rest/openapi/helpers'
import { SecurityHeadersMiddleware } from './common/application/rest/middlewares/csp.middleware'
import { HostMiddleware } from './common/application/rest/middlewares/host.middleware'
import { NextFunction, Request, Response } from 'express'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    const { env, http: { bind, frontend, openapi, trustProxy } } = app.get<Configuration>(CONFIGURATION)

    app.set('trust proxy', trustProxy)
  
    if (env === 'production'){
        app.set('env', 'production')
        app.set('x-powered-by', false)
    }

    if (openapi.expose)
        setupOpenApi(app)

    app.enableCors({
        methods: ['GET', 'POST'],
        origin: frontend.allowedOrigins
    })

    for (const middleware of [app.get(SecurityHeadersMiddleware), app.get(HostMiddleware)])
        app.use((req: Request, res: Response, next: NextFunction) => middleware.use(req, res, next))
  
    await app.listen(bind.port, bind.addr)
}

bootstrap()
