import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class NewUserDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  lastName: string;
}
