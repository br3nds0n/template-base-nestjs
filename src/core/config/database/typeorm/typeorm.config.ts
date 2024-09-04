import { EnvConfigService } from '@/common/infra/env-config/env-config.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly relationalDatabase: EnvConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.relationalDatabase.getDatabaseHost(),
      port: this.relationalDatabase.getDatabasePort(),
      database: this.relationalDatabase.getDatabaseName(),
      username: this.relationalDatabase.getDatabaseUser(),
      password: this.relationalDatabase.getDatabasePassword(),
      schema: this.relationalDatabase.getDatabaseSchema(),
      serviceName: this.relationalDatabase.getDatabaseService(),
      entities: [__dirname + './../../../../**/*.entity-schema.{ts,js}'],
      /*
       * ⚠️Nunca utilizar esse param em produção⚠️
       *
       * O parâmetro synchronize é utilizado para
       * criar as tabelas automaticamente (Uso Local)
       */
      synchronize: this.relationalDatabase.getNodeEnv() === 'dev',
      logging: true,
    } as TypeOrmModuleOptions;
  }
}
