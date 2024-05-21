export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public id?: number | null,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
