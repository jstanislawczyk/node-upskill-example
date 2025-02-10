import { EmailNotificationDto } from '../dto/email-notification.dto';

export const emailNotificationMapper = (emailNotificationDto: EmailNotificationDto) => ({
  to: emailNotificationDto.to,
  subject: emailNotificationDto.subject,
  body: emailNotificationDto.body,
  cc: emailNotificationDto.cc,
});
