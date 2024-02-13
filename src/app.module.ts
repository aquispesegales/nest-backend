import { Module } from '@nestjs/common';
import { QrModule } from './qr/qr.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  
  imports: [ConfigModule.forRoot(),QrModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
