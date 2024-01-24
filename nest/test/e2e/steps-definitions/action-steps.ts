import { DataTable } from '@cucumber/cucumber';
import { after, binding, when } from 'cucumber-tsflow';
import request from 'supertest';
import { Workspace } from './workspace';

@binding([Workspace])
export class ActionSteps {
  constructor(protected workspace: Workspace) {}

  @when(/Call POST to "([^"]*)" with the following body:$/)
  public async postCallToAPI(stringUrl: string, body: DataTable) {
    const jsonBody = body.hashes()[0];
    this.workspace.response = await request(this.workspace.app.getHttpServer())
      .post(stringUrl)
      .send(jsonBody);
  }

  @when(/Call GET to "([^"]*)"$/)
  public async getCallToAPI(url: string) {
    this.workspace.response = await request(
      this.workspace.app.getHttpServer(),
    ).get(url);
  }

  @after()
  public async after() {
    await this.workspace.app.close();
  }
}
