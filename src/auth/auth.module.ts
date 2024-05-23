import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepositoryModule } from 'src/users/repository/users.repository.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersRepositoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
