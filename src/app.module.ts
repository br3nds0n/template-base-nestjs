import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
})
export class AppModule {}
