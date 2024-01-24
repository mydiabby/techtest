import { NestApplication } from '@nestjs/core';
import { Response } from 'superagent';

export class Workspace {
  public app: NestApplication;
  public response: Response;
}
