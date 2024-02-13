import { HttpService } from '@nestjs/axios';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { io } from "socket.io-client";
import { DatosPagoDto } from './dto/datos-pago.dto';
import { map, catchError, Observable, switchMap } from 'rxjs';
import * as fs from 'fs';


@Injectable()
export class QrService {
    constructor(private readonly httpService: HttpService) { }
    confirmarWS(alias: string): void {
        const socket = io(process.env.WS, {
            transports: ['websocket'],
            secure: true,
            rejectUnauthorized: false
        });
        socket.on('connect', () => {
            console.log("back socket conectado")
            socket.emit("confirmaPagoQr", alias);
            console.log("back socket emitidos")
        });
        socket.on("connect_error", (err) => {
            console.log("error");
            console.log(err);
        });
    }
    async confirmarPago(datosPagoDto: any) {
        const axios = require('axios')
        const https = require('https')
        
        const agent = new https.Agent({
          rejectUnauthorized: false,
        })
        
        return axios
          .post(process.env.API_QUICKPAY+'/sip/endpoint/confirmaPago',datosPagoDto, {httpsAgent: agent,})
          .then((response) => {
            return {
                status:200,
                data:response.data
            }
          })
          .catch((error) => {
            /*console.log("data: "+error.response.data);
            console.log("status: "+ error.response.status);*/
            return {
                status:error.response.status,
                data:error.response.data
            }

          });



        /*axios.post('https://quickpay.com.bo:9080/sip/endpoint/confirmaPago', {
            httpsAgent: httpsAgent,
        }, datosPagoDto)
            .then((response) => {
                console.log("exito");
                return response.config.data;
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
                return error.config.data;
            })*/

    }
}
