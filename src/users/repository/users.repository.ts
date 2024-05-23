import { Inject, Injectable } from "@nestjs/common";
import { UserModel } from "../model/users.model";
import { User } from "../users.entity";
import { CreateUser, IUserRepository } from "./users.repository.interface";
import { Err, Ok, Result } from "../../result.type";
import { DbCommonError, UserNotFoundError } from "../users.errors";
import { USER_MODEL } from "../../constants";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(USER_MODEL) private readonly userModel: typeof UserModel) {}

  async create(user: CreateUser): Promise<Result<User, DbCommonError>> {
    try {
      const u = await this.userModel.create<UserModel>({
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email
      })

      return Ok(new User({
        id: u.id,
        name: u.name,
        email: u.email,
        username: u.username,
        password: u.password,
        created_at: u?.createdAt,
        updated_at: u?.updatedAt
      }))
    } catch (err: any) {
      console.error(err);
      return Err(new DbCommonError("erro ao criar usuário"))
    }     
  }

  async findByEmail(email: string): Promise<Result<User, DbCommonError | UserNotFoundError>> {
    try {
      const u = await this.userModel.findOne<UserModel>({
        where: {
          email: email
        }
      })

      if (!u) {
        return Err(new UserNotFoundError())
      }

      return Ok(new User({
        id: u.id,
        name: u.name,
        email: u.email,
        username: u.username,
        password: u.password,
        created_at: u?.createdAt,
        updated_at: u?.updatedAt
      }))
    } catch (err: any) {
      console.error(err);
      return Err(new DbCommonError("erro ao procurar usuário"))
    }     
  }
}