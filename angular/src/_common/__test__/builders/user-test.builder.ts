import {User} from "../../../features/users/business/models/user";

export class UserTestBuilder {
  private _id: string = 'a-user-id'
  private _firstName: string = 'a-first-name'
  private _lastName: string = 'a-last-name'

  build() {
    return new User(this._id, this._firstName, this._lastName)
  }

  withId(id: string) {
    this._id = id
    return this
  }

  withFirstName(firstName: string) {
    this._firstName = firstName
    return this
  }

  withLastName(lastName: string) {
    this._lastName = lastName
    return this
  }
}
