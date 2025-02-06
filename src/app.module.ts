import { Module } from '@nestjs/common';
import {UserModule} from './user-management/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import databaseConfig from './common/config/database/database.config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(databaseConfig),
  ],
})
export class AppModule {}
