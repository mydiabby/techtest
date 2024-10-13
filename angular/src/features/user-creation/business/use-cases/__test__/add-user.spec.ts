import {User} from "../../../../users/business/models/user";
import {UserTestBuilder} from "../../../../../_common/__test__/builders/user-test.builder";
import {AddUser} from "../add-user";
import {UserRepository} from "../../ports/user.repository";
import {InMemoryUserRepository} from "../../../infrastructure/in-memory-user.repository";

describe('Add user use case', () => {
  let sut: SUT
  let firstName: string
  let lastName: string
  let expectedNewUser: User
  let idGenerator: () => string = () => 'new-user-id'

  beforeEach(() => {
    firstName = 'John'
    lastName = 'Wick'
    sut = new SUT(idGenerator)
    expectedNewUser = new UserTestBuilder().withId(idGenerator()).withFirstName(firstName).withLastName(lastName).build()
  })

  it('no user is persisted', async () => {
    expect(sut.getUsers()).toEqual([])
  })

  it('adds a new user', async () => {
    await sut.addUser({ firstName, lastName })

    expect(sut.getUsers()).toEqual([expectedNewUser])
  })

  it('adds a new user in a list of existing users', async () => {
    const existingUser = new UserTestBuilder().withId('another-user-id').withFirstName('Jane').withLastName('Doe').build()
    await sut.feedWith(existingUser)

    await sut.addUser({ firstName, lastName })

    expect(sut.getUsers()).toEqual([existingUser, expectedNewUser])
  })
})

class SUT {
  private _userStorage: User[] = []
  private readonly _userRepository: UserRepository
  private readonly _addUser: AddUser

  constructor(private readonly _idGenerator: () => string) {
    this._userRepository = new InMemoryUserRepository(this._userStorage)
    this._addUser = new AddUser(this._userRepository, this._idGenerator)
  }

  getUsers() {
    return this._userStorage
  }

  async addUser(user: { firstName: string, lastName: string }) {
    await this._addUser.createAUser(user)
  }

  async feedWith(existingUser: User) {
    this._userStorage.push(existingUser)
  }
}

