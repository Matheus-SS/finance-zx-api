import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepositoryModule } from '../users/repository/users.repository.module';
import { AuthController } from './auth.controller';
import { SessionRepositoryModule } from '../sessions/repository/sessions.repository.module';

@Module({
  imports: [UsersRepositoryModule, SessionRepositoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
