import { GetFullNamesOfAllUsers } from '@application/use-cases/getFullNameOfAllUsers';
import { UserAdapterStub } from './user.adapter.stub';

describe('GetFullNamesOfAllUsers', () => {
  let userAdapterStub: UserAdapterStub;
  let getFullNamesOfAllUsers: GetFullNamesOfAllUsers;

  beforeEach(() => {
    userAdapterStub = new UserAdapterStub();
    getFullNamesOfAllUsers = new GetFullNamesOfAllUsers(userAdapterStub);
  });

  it('Get fullnames of all users by alphabetical order', async () => {
    // GIVEN
    userAdapterStub.createUser({ firstName: 'Vincent', lastName: 'Leclerc' });
    userAdapterStub.createUser({ firstName: 'John', lastName: 'Doe' });

    // WHEN
    const fullNamesOfAllUsers = await getFullNamesOfAllUsers.execute();

    // THEN
    expect(fullNamesOfAllUsers).toBeDefined();
    expect(fullNamesOfAllUsers).toBeInstanceOf(Array);
    expect(typeof fullNamesOfAllUsers[0]).toBe('string');
    expect(fullNamesOfAllUsers[0]).toBe('John DOE');
    expect(typeof fullNamesOfAllUsers[1]).toBe('string');
    expect(fullNamesOfAllUsers[1]).toBe('Vincent LECLERC');
  });
});
