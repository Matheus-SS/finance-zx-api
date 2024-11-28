import { Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";
import { BCRYPT_SERVICE, JWT_SERVICE } from "@app/constants";
import { JwtService } from "./jwt.service";

@Module({
  providers: [
    {
      provide: BCRYPT_SERVICE,
      useClass: BcryptService,
    },
    {
      provide: JWT_SERVICE,
      useClass: JwtService
    }
  ],
  exports: [
    {
      provide: BCRYPT_SERVICE,
      useClass: BcryptService,
    },
    {
      provide: JWT_SERVICE,
      useClass: JwtService
    }
  ]
})

export class ExtraModule {}