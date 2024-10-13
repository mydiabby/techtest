import {RetrieveUsers} from "../retrieve-users";
import {InMemoryUserGateway} from "../../../infrastructure/in-memory/in-memory-user.gateway";
import {UserTestBuilder} from "../../../../../_common/__test__/builders/user-test.builder";
import {User} from "../../models/user";

describe('Retrieve users use case', () => {
  let sut: SUT
  let users: User[]

  beforeEach(() => {
    sut = new SUT()
    users = [
      new UserTestBuilder().withId('1').withFirstName('John').withLastName('Doe').build(),
      new UserTestBuilder().withId('2').withFirstName('Jane').withLastName('Doe').build()
    ]
  })

  it('should retrieve users', async () => {
    sut.givenUsers(users)

    const allUsers = await sut.retrieveAllUsers()

    expect(allUsers).toEqual(users.map(user => user.toUserVM()))
  })
})

class SUT {
  private readonly _userStorage: User[] = []
  private readonly _userGateway: InMemoryUserGateway
  private readonly _retrieveUsers: RetrieveUsers

  constructor() {
    this._userGateway = new InMemoryUserGateway(this._userStorage)
    this._retrieveUsers = new RetrieveUsers(this._userGateway)
  }

  givenUsers(users: User[]) {
    this._userGateway.feedWith(users)
  }

  async retrieveAllUsers() {
    return this._retrieveUsers.retrieve()
  }
}

