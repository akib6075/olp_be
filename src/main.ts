import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { Logger, RequestMethod, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const SWAGGER_ENVS = ['development', 'local'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('ApplicationStartUp'),
    cors: true,
  });
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'hello', method: RequestMethod.GET }],
  });
  app.enableVersioning({
		type: VersioningType.URI,
	});
  if (SWAGGER_ENVS.includes(process.env.NODE_ENV || 'development')) {
    app.use(
      ['/apidoc'],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
      }),
    );
  }

  const config = new DocumentBuilder()
    .setTitle('OLP')
    .setDescription('Api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentBack = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apidoc", app, documentBack);
  const app_port = parseInt(process.env.APP_PORT);
  await app.listen(app_port);
  Logger.log(`Application is running on port: ${app_port} in ${process.env.NODE_ENV} environment`);
}
bootstrap();
