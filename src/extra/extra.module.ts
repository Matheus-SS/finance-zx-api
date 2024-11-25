import { Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";

@Module({
  providers: [
    {
      provide: 'BCRYPT_SERVICE',
      useClass: BcryptService,
    }
  ],
  exports: [
    {
      provide: 'BCRYPT_SERVICE',
      useClass: BcryptService,
    }
  ]
})

export class ExtraModule {}