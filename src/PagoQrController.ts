import { Controller, Get, Param } from '@nestjs/common';

import { io } from "socket.io-client";

@Controller('api')
export class PagoQrController {
  @Get('/notificar/:alias')
  NotificaPagoQr(@Param('alias') alias: string) {


    const socket = io('https://localhost:9083',{
      transports:['websocket']
    });
    console.log("back socket por conectar")

    socket.on('connect', () => {
      console.log("back socket conectado")
      socket.emit("confirmaPagoQr", alias);
      console.log("back socket emitidos")
    });


    socket.on("connect_error", (err) => {
      console.log("error");
      console.log(err.message);
    });


    
  }

}