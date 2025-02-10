import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmailNotificationDto {

  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  public to: string[];

  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsString()
  public body: string;

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  public cc?: string[];
}
