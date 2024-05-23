import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoryProvider } from './repository/users.repository.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserModelProvider } from './model/users.model.provider';
import { UsersRepositoryModule } from './repository/users.repository.module';

@Module({
  imports: [UsersRepositoryModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
