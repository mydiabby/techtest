// ESM
import { UserCreateInput } from '@/modules/user/dto/user.create.input';
import { faker } from '@faker-js/faker';

export const createFakeUser = (): UserCreateInput => {
  return {
    firstname: faker.internet.userName(),
    lastname: faker.internet.userName(),
  };
};

export const generateFakeUsers = async (
  count = 5,
): Promise<UserCreateInput[]> => {
  const users = faker.helpers.multiple(() => createFakeUser(), {
    count,
  });

  return users;
};
