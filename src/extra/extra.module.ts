import { Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";
import { BCRYPT_SERVICE } from "@app/constants";

@Module({
  providers: [
    {
      provide: BCRYPT_SERVICE,
      useClass: BcryptService,
    }
  ],
  exports: [
    {
      provide: BCRYPT_SERVICE,
      useClass: BcryptService,
    }
  ]
})

export class ExtraModule {}