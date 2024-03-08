import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // All routes
    // consumer.apply(LoggingMiddleware).forRoutes('users'); // Only users routes
    // consumer.apply(LoggingMiddleware).forRoutes({path: 'users', method: RequestMethod.GET}); // Only users GET routes
    // consumer.apply(LoggingMiddleware).exclude('users').forRoutes('*'); // All routes except the users ones
  }
}
