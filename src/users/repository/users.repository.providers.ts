import { USER_REPOSITORY } from "../../constants";
import { UserRepository } from "./users.repository";

export const UserRepositoryProvider = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }
]
