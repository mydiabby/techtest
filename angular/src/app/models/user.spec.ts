import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    const firstName = 'joe';
    const lastName = 'bar';
    expect(new User(1, firstName, lastName)).toBeTruthy();
  });
});
