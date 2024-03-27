import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT } from 'src/config/app.config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
});

const logger = new Logger('APP');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Boresh APi')
    .setDescription('The Boresh API description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  const redocOptions: RedocOptions = {
    title: 'Hello Nest',
    logo: {
      url: 'https://redocly.github.io/redoc/petstore-logo.png',
      backgroundColor: '#F0F0F0',
      altText: 'PetStore logo',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    requiredPropsFirst: true,
  };
  // Instead of using SwaggerModule.setup() you call this module
  await RedocModule.setup('/redoc', app as any, document, redocOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT);

  logger.log(`server is running on http://localhost:${PORT}`);
  logger.log(`swagger is available on http://localhost:${PORT}/swagger`);
  logger.log(`redoc is available on http://localhost:${PORT}/redoc`);
  logger.log(`swagger is available on http://localhost:${PORT}/queues`);
}

bootstrap();
