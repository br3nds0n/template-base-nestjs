import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './typeorm.config';
import { EnvConfigModule } from '@/common/infra/env-config/env-config.module';
import { EnvConfigService } from '@/common/infra/env-config/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useClass: TypeOrmConfig,
    }),
  ],
})
export class TypeOrmConfigModule {}
