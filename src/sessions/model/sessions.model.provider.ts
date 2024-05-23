import { SESSION_MODEL } from "../../constants";
import { SessionModel } from "./sessions.model";

export const SessionModelProvider = [
  {
    provide: SESSION_MODEL,
    useValue: SessionModel
  }
]