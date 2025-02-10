import { SMSNotificationDto } from '../dto/sms-notification.dto';

export const smsNotificationMapper = (smsNotificationDto: SMSNotificationDto) => ({
  to: smsNotificationDto.to,
  subject: smsNotificationDto.subject,
  body: smsNotificationDto.body,
});
