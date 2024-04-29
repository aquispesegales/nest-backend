import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs  from 'fs';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/home/quickpay/public_html/PRD/SSL/quickpay_com_bo.key'),
    cert: fs.readFileSync('/home/quickpay/public_html/PRD/SSL/quickpay_com_bo.crt'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  /*const app = await NestFactory.create(AppModule,{cors:true});
  app.enableVersioning({
    defaultVersion:'1',
    type: VersioningType.URI
  });*/
  await app.listen(process.env.PORT);
}
bootstrap();
