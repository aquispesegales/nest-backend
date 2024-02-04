import { Controller, Get, Param } from '@nestjs/common';

import { io } from "socket.io-client";

@Controller('api')
export class PagoQrController {
  @Get('/notificar/:alias')
  NotificaPagoQr(@Param('alias') alias: string) {


    const socket = io('ws://localhost:9083');
    console.log("sokete por conectar")

    socket.on('connect', () => {
      socket.emit("confirmaPagoQr", alias);
      console.log("sokete conectado")
    });


    
  }

}