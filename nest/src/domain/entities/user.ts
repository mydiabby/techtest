export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = new Date();
    this.updatedAt = null;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
