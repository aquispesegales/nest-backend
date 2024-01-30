import { Controller, Get, Param } from '@nestjs/common';

import { io } from "socket.io-client";

@Controller('api')
export class PagoQrController {
  @Get('/notificar/:alias')
  NotificaPagoQr(@Param('alias') alias: string) {
    /*const socket = io('https://quickpay.com.bo:9083');
    socket.connect();
    console.log("empezando conexion")
    socket.on('connect', () => {
      console.log("amitiendoooo")
      socket.emit("confirmaPagoQr", alias);
      console.log("sokete conectado")
    });*/



    var WebSocketClient = require('websocket').client;

    var client = new WebSocketClient();
    //client.Options.RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

    client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function (connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function () {
        console.log('echo-protocol Connection Closed');
      });
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          console.log("Received: '" + message.utf8Data + "'");
        }
      });

      function sendNumber() {
        if (connection.connected) {
          var number = Math.round(Math.random() * 0xFFFFFF);
          connection.sendUTF(number.toString());
          setTimeout(sendNumber, 1000);
        }
      }
      sendNumber();
    });

    client.connect('wss://quickpay.com.bo:9083/', 'echo-protocol');

  }
}