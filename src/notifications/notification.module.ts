import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { SmsService } from './services/sms.service';
import { EmailService } from './services/email.service';
import { HashMapNotificationRepository } from './repositories/notification.repository';

@Module({
  controllers: [NotificationController],
  providers: [SmsService, EmailService, HashMapNotificationRepository],
})
export class NotificationModule {}
