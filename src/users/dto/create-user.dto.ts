export class CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
}

type Res = {
  id: number;
  name: string;
  username: string;
  email: string;
  created_at: number;
}
export class RCreateUserDto {
  private id: number;
  private name: string;
  private username: string;
  private email: string;
  private created_at: number;
  constructor(data: Res) {
    this.id = data.id,
    this.name = data.name,
    this.email = data.email,
    this.username = data.username
    this.created_at = data.created_at
  }
}