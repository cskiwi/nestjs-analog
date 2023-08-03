import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCount(): string {
    return this.appService.getCount().toString();
  }

  @Get('increment')
  increment(): number {
    return this.appService.increment();
  }
}
