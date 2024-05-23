import { SESSION_REPOSITORY } from "../../constants";
import { SessionRepository } from "./sessions.repository";

export const SessionRepositoryProvider = [
  {
    provide: SESSION_REPOSITORY,
    useClass: SessionRepository
  }
]
