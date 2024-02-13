import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs  from 'fs';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('./secrets/private.key'),
    cert: fs.readFileSync('./secrets/certificate.crt'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  //const app = await NestFactory.create(AppModule,{cors:true});
  app.enableVersioning({
    defaultVersion:'1',
    type: VersioningType.URI
  });
  await app.listen(process.env.PORT);
}
bootstrap();
