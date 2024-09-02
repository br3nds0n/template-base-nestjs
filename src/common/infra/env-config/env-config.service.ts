import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('APP_PORT'));
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpiresInSeconds(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES_IN'));
  }
  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA_NAME');
  }

  getDatabaseService(): string {
    return this.configService.get<string>('DATABASE_SERVICE_NAME');
  }

  getDatabaseServiceAccessSSL(): string {
    return this.configService.get<string>('DATABASE_SERVICE_ACCESS_SSL');
  }
}
