import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {

  @Cron(CronExpression.EVERY_MINUTE)
  public async notify(): Promise<void> {
    console.log('Scheduled task executed');
  }
}
