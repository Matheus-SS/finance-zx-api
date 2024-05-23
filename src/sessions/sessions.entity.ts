import { IsNullUndefinedOrEmpty } from "src/helper";
import { Err, Ok, Result } from "src/result.type";
import { ValidationInputError } from "src/users/users.errors";

export type Session = {
  id: string;
  user_id: number;
  expires_in: number;
  created_at: number;
  updated_at?: number;
}

export type ErrDomain = {
  errName: string;
  errValue: string;
}


export class SessionEntity {
  id: string;
  user_id: number;
  expires_in: number;
  created_at: number;
  updated_at?: number;
  private constructor(data: Session) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.expires_in = data.expires_in;
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
      created_at: data.created_at,
      updated_at: data?.updated_at,
      expires_in: data.expires_in
    }))
  }
}