import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { EnvConfigModule } from './shared';
import { TypeOrmConfigModule } from './core';

@Module({
  imports: [EnvConfigModule, UsersModule, TypeOrmConfigModule],
})
export class AppModule {}
