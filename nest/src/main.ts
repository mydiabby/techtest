import { NestFactory } from '@nestjs/core'
import { AppModule } from './_common/app/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableShutdownHooks().enableCors()
    await app.listen(3000)
}
bootstrap()
