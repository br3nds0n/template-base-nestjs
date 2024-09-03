import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { EnvConfigService } from './common/infra/env-config/env-config.service';
import { applyGlobalConfig } from './global-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(EnvConfigService);

  const APP_PORT = configService.getAppPort();

  applyGlobalConfig(app);

  const config = new DocumentBuilder()
    .setTitle('Node.js Course')
    .setDescription(
      'Node.js Rest API - NestJs, Typescript, DDD, Clean Architecture and Automated Tests',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'Infomar o JWT para autorizar o acesso',
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
