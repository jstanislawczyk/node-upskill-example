import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DatabaseUserService } from './user.service-inject';
import { User } from './user.entity';
import { NewUserDto } from './dto/new-user.dto';
import { mapToNewUser, mapToUserDto } from './mappers/new-user.dto.mapper';
import { UserDto } from './dto/user.dto';

@Controller("/users")
export class UserController {

  constructor(
    private readonly userService: DatabaseUserService,
  ) {}

  @Get(":id")
  public async getUser(
    @Param("id") id: number,
  ): Promise<UserDto | null> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id=${id} not found`);
    }

    return mapToUserDto(user);
  }

  @Post()
  public async createUser(
    @Body() newUserDto: NewUserDto,
  ): Promise<User | null> {
    const newUser = mapToNewUser(newUserDto);
    return this.userService.saveUser(newUser);
  }
}
