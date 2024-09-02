import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigProvider } from './typeorm-config.service';
import { EnvConfigModule } from '@/common/infra/env-config/env-config.module';
import { EnvConfigService } from '@/common/infra/env-config/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useClass: TypeOrmConfigProvider,
    }),
  ],
})
export class TypeOrmConfigModule {}
