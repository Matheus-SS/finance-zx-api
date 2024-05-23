import { Result } from "../../result.type";
import { User } from "../users.entity";
import { DbCommonError, UserNotFoundError } from "../users.errors";

export type CreateUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  created_at: number;
}
export interface IUserRepository {
  create(user: CreateUser): Promise<Result<User, DbCommonError>>
  findByEmail(email: string): Promise<Result<User, DbCommonError | UserNotFoundError>>
}
