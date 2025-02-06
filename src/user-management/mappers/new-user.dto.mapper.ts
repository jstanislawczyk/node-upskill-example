import {NewUserDto} from '../dto/new-user.dto';
import {User} from '../user.entity';

export const mapToUser = (newUserDto: NewUserDto): User => {
  return {
    id: 1,
    email: newUserDto.email,
    firstName: newUserDto.firstName,
    lastName: newUserDto.lastName
  };
}


