import { Module } from "@nestjs/common";
import { PersistenceModule } from "../persistence/persistence.module";
import { UserService } from "./user.service";

@Module({
  imports: [ PersistenceModule ],
  providers: [ UserService ],
  exports: [ UserService ]
})
export class ServiceModule {}