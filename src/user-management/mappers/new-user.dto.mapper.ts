import { NewUserDto } from '../dto/new-user.dto';
import { User } from '../user.entity';
import { NewUser } from '../domain/new-user';
import { UserDto } from '../dto/user.dto';

export const mapToNewUser = (newUserDto: NewUserDto): NewUser => ({
  email: newUserDto.email,
  firstName: newUserDto.firstName,
  lastName: newUserDto.lastName
});

export const mapToUserDto = (user: User): UserDto => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName
});

