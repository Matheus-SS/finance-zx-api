import { Module } from "@nestjs/common";
import { SessionModelProvider } from "../model/sessions.model.provider";
import { SessionRepositoryProvider } from "./sessions.repository.providers";

@Module({
  providers: [...SessionModelProvider, ...SessionRepositoryProvider],
  controllers: [],
  exports: [...SessionRepositoryProvider]
})
export class SessionRepositoryModule {}