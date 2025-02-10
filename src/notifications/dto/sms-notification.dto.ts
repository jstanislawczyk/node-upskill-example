import { ArrayMinSize, IsArray, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SMSNotificationDto {

  @IsPhoneNumber()
  @ArrayMinSize(1)
  @IsArray()
  public to: string[];

  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsString()
  public body: string;
}
