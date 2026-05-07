import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GetUsersQueryDto } from './get-users-query.dto';

const validateDto = (payload: object) =>
  validate(plainToInstance(GetUsersQueryDto, payload));

describe('GetUsersQueryDto', () => {
  it('passes with no parameters', async () => {
    const errors = await validateDto({});
    expect(errors).toHaveLength(0);
  });

  it('passes with valid sortBy and sortDir', async () => {
    const errors = await validateDto({ sortBy: 'lastName', sortDir: 'desc' });
    expect(errors).toHaveLength(0);
  });

  it('fails when sortBy is not an allowed field', async () => {
    const errors = await validateDto({ sortBy: 'password' });
    expect(errors.find((e) => e.property === 'sortBy')).toBeDefined();
  });

  it('fails when sortDir is not asc or desc', async () => {
    const errors = await validateDto({ sortDir: 'ascending' });
    expect(errors.find((e) => e.property === 'sortDir')).toBeDefined();
  });
});
