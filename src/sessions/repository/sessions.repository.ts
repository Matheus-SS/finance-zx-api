import { Inject, Injectable } from "@nestjs/common";
import { SessionModel } from "../model/sessions.model";
import { SessionEntity, Session } from "../sessions.entity";
import { ISessionRepository } from "./sessions.repository.interface";
import { Err, Ok, Result } from "../../result.type";
import { DbCommonError, SessionNotFoundError, ValidationInputError } from "../../users/users.errors";
import { SESSION_MODEL } from "../../constants";

@Injectable()
export class SessionRepository implements ISessionRepository{
  constructor(@Inject(SESSION_MODEL) private readonly sessionModel: typeof SessionModel) {}

  async create(session: Session): Promise<Result<SessionEntity, DbCommonError | ValidationInputError>> {
    try {
      const sm = await this.sessionModel.create<SessionModel>({
        id: session.id,
        user_id: session.user_id,
        created_at: session.created_at,
        expires_in: session.expires_in,
        updated_at: session?.updated_at
      })

      const s = SessionEntity.create({
        id: sm.id,
        user_id: sm.user_id,
        created_at: sm.created_at,
        updated_at: sm?.updated_at,
        expires_in: sm.expires_in
      })

      if (s.ok === false) {
        if (s.error.type === 'ValidationInputErr') {
          return Err(new ValidationInputError(s.error.msg))
        }
      } else {
        return Ok(s.value)
      }

    } catch (err: any) {
      console.error(err);
      return Err(new DbCommonError("erro ao criar sessão de usuário"))
    }     
  }

  async findById(session_id: string): Promise<Result<SessionEntity, DbCommonError | SessionNotFoundError | ValidationInputError>> {
    try {
      const sm = await this.sessionModel.findOne<SessionModel>({
        where: {
          id: session_id
        }
      })

      if (!sm) {
        return Err(new SessionNotFoundError())
      }

      const s = SessionEntity.create({
        id: sm.id,
        user_id: sm.user_id,
        created_at: sm.createdAt,
        updated_at: sm?.updatedAt,
        expires_in: sm.expires_in
      })

      if (s.ok === false) {
        if (s.error.type === 'ValidationInputErr') {
          return Err(new ValidationInputError(s.error.msg))
        }
      } else {
        return Ok(s.value)
      }
    } catch (err: any) {
      console.error(err);
      return Err(new DbCommonError("erro ao encontrar sessão"))
    }     
  }
}