import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import compression from 'compression';
import { after, before, binding } from 'cucumber-tsflow';
import helmet from 'helmet';
import { AppModule } from '../../../src/app.module';
import { ExceptionInterceptor } from '../../../src/interceptors/exception.interceptor';
import { Workspace } from './workspace';

@binding([Workspace])
export class Base {
  constructor(protected workspace: Workspace) {}

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.workspace.app = moduleFixture.createNestApplication();

    // performance
    await this.workspace.app.use(compression());

    // security
    await this.workspace.app.use(helmet());

    // validation
    this.workspace.app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        skipNullProperties: true,
        skipUndefinedProperties: false,
        transform: false,
        whitelist: true,
      }),
    );

    // exception
    this.workspace.app.useGlobalInterceptors(new ExceptionInterceptor());

    // cross origin resource sharing
    this.workspace.app.enableCors();

    await this.workspace.app.init();

    // TODO clean data inserted.
  }

  @after()
  public async after(): Promise<void> {
    await this.workspace.app.close();
  }
}
