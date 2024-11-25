
export interface IUserRepository {
  create(data: Create): Promise<RCreate>;
  findByEmail(email: string): Promise<RFindByEmail>;
}

export type Create = {
  email: string;
  name: string;
  url_avatar?: null | string;
  password: string;
  setting_id?: null | number;
}

export type RCreate = {
  id: number;
  email: string;
  name: string;
  url_avatar?: null | string;
  password: string;
  setting_id?: null | number;
  created_at: number;
  updated_at?: null | number;
}

export type RFindByEmail = {
  id: number;
  email: string;
  name: string;
  url_avatar?: null | string;
  password: string;
  setting_id?: null | number;
  created_at: number;
  updated_at?: null | number;
}