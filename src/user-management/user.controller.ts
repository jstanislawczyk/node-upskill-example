import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from './user.entity';
import {NewUserDto} from './dto/new-user.dto';
import {mapToUser} from './mappers/new-user.dto.mapper';

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  public getUser(id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }


  @Post()
  public createUser(
    @Body() newUserDto: NewUserDto
  ): Promise<User | null> {
    const newUser = mapToUser(newUserDto);
    return this.userService.saveUser(newUser);
  }
}
