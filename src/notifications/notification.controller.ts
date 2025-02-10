import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EmailNotificationDto } from './dto/email-notification.dto';
import { SMSNotificationDto } from './dto/sms-notification.dto';
import { emailNotificationMapper } from './mappers/email-notification.mapper';
import { smsNotificationMapper } from './mappers/sms-notification.mapper';
import { NotificationHandler, NotificationRepository } from './services/notification.handler';
import { HashMapNotificationRepository } from './repositories/notification.repository';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';

@Controller("/notifications")
export class NotificationController {

  constructor(
    @Inject(HashMapNotificationRepository)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @Post("/email")
  public async publishEmail(
    @Body() newEmailNotificationDto: EmailNotificationDto,
  ): Promise<void> {
    const emailNotification = emailNotificationMapper(newEmailNotificationDto);
    const emailService = new EmailService();
    const emailHandler = new NotificationHandler(emailService, this.notificationRepository);

    await emailHandler.handle(emailNotification);
  }

  @Post("sms")
  public async publishSMS(
    @Body() newUserDto: SMSNotificationDto,
  ): Promise<void> {
    const smsNotification = smsNotificationMapper(newUserDto);
    const smsService = new SmsService();
    const smsHandler = new NotificationHandler(smsService, this.notificationRepository);

    await smsHandler.handle(smsNotification);
  }
}
