import { Controller, Get, Param } from '@nestjs/common';

import { io } from "socket.io-client";

@Controller('api')
export class PagoQrController {
  @Get('/notificar/:alias')
  NotificaPagoQr(@Param('alias') alias: string) {
    const socket = io('wss://localhost:9083');
    //const socket = io('wss://quickpay.com.bo:9083');
    console.log("empezando conexion")
    socket.on('connect', () => {
      console.log("amitiendoooo")
      socket.emit("confirmaPagoQr", alias);
      console.log("sokete conectado")
    });
  }
}