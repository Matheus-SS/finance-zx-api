
export interface IUserRepository {
  create(data: Create): Promise<void>;
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