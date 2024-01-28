import { Controller, Get, Param } from '@nestjs/common';

import { io } from "socket.io-client";

@Controller('api/pago-qr-controller')
export class PagoQrController {
  @Get('/notificar/:alias')
  NotificaPagoQr(@Param('alias') alias: string) {
    const socket = io('wss://localhost:9083');
    console.log("empezando conexion")
    socket.on('connect', () => {
      socket.emit("confirmaPagoQr", alias);
      console.log("sokete conectado")
    });
  }
}