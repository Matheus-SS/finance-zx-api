import { Module } from "@nestjs/common";
import { PersistenceModule } from "@persistence/persistence.module";
import { UserService } from "./user/user.service";
import { ExtraModule } from "@extra/extra.module";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [ PersistenceModule, ExtraModule ],
  providers: [ UserService, AuthService ],
  exports: [ UserService, AuthService ]
})
export class ServiceModule {}