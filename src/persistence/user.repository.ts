import { Inject, Injectable } from "@nestjs/common";
import { Create, IUserRepository } from "./user.interface";
import { KNEX_CONNECTION } from "../constants";
import { Database } from "../database/knex/interface";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly conn: Database
  ){}
  async create(data: Create) {
    const sql = `
    INSERT INTO tbl_users 
      (email, name, url_avatar, password, setting_id)
    VALUES 
      (:email, :name, :url_avatar, :password, :setting_id) RETURNING id, email, name, url_avatar, password, setting_id, created_at,updated_at
    `
    const res = await this.conn.queryRaw(sql, data);

    console.log(res);

    return;
  }
  
}