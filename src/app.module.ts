import { Module } from '@nestjs/common';
import {UserModule} from './user-management/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import databaseConfig from './common/config/database/database.config';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    CronModule,
    TypeOrmModule.forRoot(databaseConfig),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
