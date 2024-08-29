import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const APP_PREFIX = configService.get<string>('APP_PREFIX');
  const APP_PORT = configService.get<string>('APP_PORT');
  const APP_URL = configService.get<string>('APP_URL');

  const config = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('Template API document definition')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(APP_PORT, APP_URL, (err, address) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.log(`Server listening on ${address}/${APP_PREFIX}`, 'App');
    Logger.log(
      `Swagger documentation available at ${address}/${APP_PREFIX}/swagger`,
      'App',
    );
  });
}
bootstrap();
