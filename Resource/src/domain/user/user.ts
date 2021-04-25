export class User {
  public name: string;
  public email: string;
  public gcn: string;

  constructor({ name, email, gcn }) {
    this.name = name;
    this.email = email;
    this.gcn = gcn;
  }
}
