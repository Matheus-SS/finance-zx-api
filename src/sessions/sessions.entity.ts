import { IsNullUndefinedOrEmpty } from "src/helper";
import { Err, Ok, Result } from "src/result.type";
import { ValidationInputError } from "src/users/users.errors";

export type Session = {
  id: string;
  user_id: number;
  expires_in: number;
  created_at: number;
  is_active: boolean;
  updated_at?: number;
}

export type ErrDomain = {
  errName: string;
  errValue: string;
}


export class SessionEntity {
  private _id: string;
  private user_id: number;
  private expires_in: number;
  private created_at: number;
  private updated_at?: number;
  private is_active: boolean;
  private constructor(data: Session) {
    this._id = data.id;
    this.user_id = data.user_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.expires_in = data.expires_in;
    this.is_active = data.is_active
  }
  
  static create(data: Session): Result<SessionEntity, ValidationInputError> {
    const err:  ErrDomain[] = []
    if (IsNullUndefinedOrEmpty(data.id)) {
      err.push({
        errName: 'id',
        errValue: 'campo obrigatório'
      })
    }

    if (IsNullUndefinedOrEmpty(data.user_id)) {
      err.push({
        errName: 'user_id',
        errValue: 'campo obrigatório'
      })
    }

    if (IsNullUndefinedOrEmpty(data.created_at)) {
      err.push({
        errName: 'created_at',
        errValue: 'campo obrigatório'
      })
    }

    if (err.length > 0) {
      return Err(new ValidationInputError(err))
    }

    return Ok(new SessionEntity({
      id: data.id,
      user_id: data.user_id,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data?.updated_at,
      expires_in: data.expires_in
    }))
  }

  get id(): string {
    return this._id
  }
}