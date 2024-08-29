import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { EnvConfigService } from './shared/infra/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(EnvConfigService);

  const APP_PORT = configService.getAppPort();

  await app.listen(APP_PORT, '0.0.0.0', (err, address) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.log(`Server listening on ${address}/`, 'App');
    Logger.log(`Swagger documentation available at ${address}/swagger`, 'App');
  });
}
bootstrap();
