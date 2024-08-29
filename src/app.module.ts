import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [EnvConfigModule, UsersModule],
})
export class AppModule {}
