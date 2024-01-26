
import { ConfigService } from '../../config.service';
import { UserService } from './user.service';

import Substitute, { SubstituteOf } from '@fluffy-spoon/substitute';

describe('UserService', () => {
  let userService: SubstituteOf<UserService>;
  let configService: SubstituteOf<ConfigService>;

  beforeEach(() => {
    userService = Substitute.for<UserService>();
    configService = Substitute.for<ConfigService>();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
});
