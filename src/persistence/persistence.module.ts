import { Module } from "@nestjs/common";
import { UserRepository } from "./index";
import { USER_REPOSITORY } from "../constants";

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    },
  ],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    }
  ]
})
export class PersistenceModule {}