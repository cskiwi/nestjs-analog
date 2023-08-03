import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCount() {
    return {
      count: this.appService.getCount(),
    };
  }

  @Get('increment')
  increment() {
    return {
      count: this.appService.increment(),
    };
  }
}
