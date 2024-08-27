import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ImcCalculatorService } from './imc-calculator.service';
import { ImcCalculatorRequest } from './imc-calculator.dtos';

@Controller('imc')
export class ImcCalculatorController {
  constructor(private readonly imcCalcService: ImcCalculatorService) {}

  @Get('hello')
  getHello() {
    return this.imcCalcService.hello();
  }

  @Get('table')
  getTable() {
    return this.imcCalcService.getTable();
  }

  @Get('table/html')
  @Render('imcTable.hbs')
  getTableHtml() {
    return { data: this.imcCalcService.getTable() };
  }

  @Post('calculate')
  calculate(@Body() request: ImcCalculatorRequest) {
    return this.imcCalcService.calculateAndTranslate(request);
  }

  @Get('calculate/html')
  @Render('calculateImc.hbs')
  showForm() {
    return { data: {} };
  }

  @Post('calculate/html')
  @Render('calculateImc.hbs')
  calculateImc(@Body() request: ImcCalculatorRequest) {
    const response = this.imcCalcService.calculateAndTranslate(request);
    console.log(response)
    return { data: response };
  }
}
