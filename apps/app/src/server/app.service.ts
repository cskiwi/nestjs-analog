import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private count = 0;

  getCount(): number {
    return this.count;
  }

  increment(): number {
    this.count++;
    return this.count;
  }
}
