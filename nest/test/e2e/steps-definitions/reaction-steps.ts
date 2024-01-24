import { DataTable } from '@cucumber/cucumber';
import * as assert from 'assert';
import { after, binding, then } from 'cucumber-tsflow';
import { Workspace } from './workspace';

@binding([Workspace])
export class ReactionSteps {
  constructor(protected workspace: Workspace) {}

  @then(/the response status code should be "([^"]*)"/)
  public statusResponse(status: string) {
    assert.equal(this.workspace.response.status, status);
  }

  @then(/the response should be:$/)
  public dataResponse(data: DataTable) {
    const expected = data.hashes();
    const results = Array.isArray(this.workspace.response.body)
      ? this.workspace.response.body
      : [this.workspace.response.body];

    for (let i = 0; i < results.length; i++) {
      Object.keys(expected[i]).forEach((key) => {
        const expectedValue = expected[i][key]?.toString();
        const resultValue =
          typeof results[i] === 'string'
            ? results[i]
            : results[i][key]?.toString();

        if (/^\/.*\/$/.test(expectedValue)) {
          // Input is a regex
          const match = expectedValue.match(new RegExp('^/(.*?)/([gimy]*)$'));
          const regex = new RegExp(match[1], match[2]);
          assert.match(resultValue, regex);
        } else {
          // Input is a string
          assert.equal(resultValue, expectedValue);
        }
      });
    }
  }

  @after()
  public async after() {
    await this.workspace.app.close();
  }
}
