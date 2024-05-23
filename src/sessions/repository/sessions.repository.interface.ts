import { Result } from "../../result.type";
import { Session, SessionEntity } from "../sessions.entity";
import { DbCommonError, SessionNotFoundError, ValidationInputError } from "../../users/users.errors";

export interface ISessionRepository {
  create(user: Session): Promise<Result<SessionEntity, DbCommonError | ValidationInputError>>
  findById(session_id: string): Promise<Result<SessionEntity, DbCommonError | SessionNotFoundError | ValidationInputError>>
}