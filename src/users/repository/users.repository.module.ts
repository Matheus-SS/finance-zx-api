import { Module } from "@nestjs/common";
import { UserModelProvider } from "../model/users.model.provider";
import { UserRepositoryProvider } from "./users.repository.providers";

@Module({
  providers: [...UserModelProvider, ...UserRepositoryProvider],
  controllers: [],
  exports: [...UserRepositoryProvider]
})
export class UsersRepositoryModule {}