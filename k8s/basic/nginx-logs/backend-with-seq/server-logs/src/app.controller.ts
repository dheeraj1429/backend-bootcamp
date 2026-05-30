import { SeqLogger } from '@jasonsoft/nestjs-seq';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly logger: SeqLogger) {}

  @Get('log')
  async log() {
    this.logger.log('This is the message logged from the log method', {
      name: 'AppController',
      note: 'This is the demo log',
    });
  }
}
