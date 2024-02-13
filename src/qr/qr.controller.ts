import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { QrService } from './qr.service';
import { DatosPagoDto } from './dto/datos-pago.dto';
import { Response } from 'express';


@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) { }

  @Get('/notificar/:alias')
  NotificaPagoQr(@Param('alias') alias: string) {
    this.qrService.confirmarWS(alias);
  }
  @Post("/confirmaPago")
  async ConfirmaPago(@Body() datosPagoDto: DatosPagoDto, @Res() response: Response) {
    let r = await this.qrService.confirmarPago(datosPagoDto);
    response.status(r.status).send(r.data);
  }
  @Get('/hola')
  saludo() {
    return "holaa";
  }

}
