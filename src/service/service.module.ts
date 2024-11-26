import { Module } from "@nestjs/common";
import { PersistenceModule } from "../persistence/persistence.module";
import { UserService } from "./user/user.service";
import { ExtraModule } from "../extra/extra.module";

@Module({
  imports: [ PersistenceModule, ExtraModule ],
  providers: [ UserService ],
  exports: [ UserService ]
})
export class ServiceModule {}