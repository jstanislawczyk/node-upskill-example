import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServiceInject } from './user.service-inject';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserServiceInject],
})
export class UserModule {}
