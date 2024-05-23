import { USER_MODEL } from "../../constants";
import { UserModel } from "./users.model";

export const UserModelProvider = [
  {
    provide: USER_MODEL,
    useValue: UserModel
  }
]