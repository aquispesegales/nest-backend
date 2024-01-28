import { Module } from '@nestjs/common';
import {PagoQrController} from './PagoQrController';


@Module({
  imports: [],
  controllers: [PagoQrController],
  providers: [],
})
export class AppModule {}
