export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
