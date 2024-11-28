import { Inject, Injectable } from "@nestjs/common";
import { Create, IUserRepository, RCreate, RFindByEmail } from "./user.interface";
import { KNEX_CONNECTION } from "@app/constants";
import { Database } from "@database/knex/interface";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly conn: Database
  ){}

  async create(data: Create): Promise<RCreate> {
    const sql = `
    INSERT INTO tbl_users 
      (email, name, url_avatar, password, setting_id)
    VALUES 
      (:email, :name, :url_avatar, :password, :setting_id) RETURNING id, email, name, url_avatar, password, setting_id, created_at,updated_at
    `
    const res = await this.conn.queryRaw(sql, data);

    return res[0];
  }
  
  async findByEmail(email: string): Promise<RFindByEmail> {
    const sql = `SELECT email, name, url_avatar, password, setting_id, created_at, updated_at FROM tbl_users WHERE email = :email`;
    const res = await this.conn.queryRaw(sql, { email: email });

    return res[0];
  }

}