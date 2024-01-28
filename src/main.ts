import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  /*const httpsOptions = {
    key: fs.readFileSync('/etc/ssl-exacta/private.key'),
    cert: fs.readFileSync('/etc/ssl-exacta/certificate.crt'),
  };*/
  /*const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });*/
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(9082);
}
bootstrap();
