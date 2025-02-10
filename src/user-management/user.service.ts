import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUser } from './model/new-user';
import { UserRepository } from './user.repository';

export interface UserService {
  getUserById(id: number): Promise<User | null>;
  saveUser(user: NewUser): Promise<User>;
}

@Injectable()
export class DatabaseUserService implements UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  public async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async saveUser(user: NewUser): Promise<User> {
    return this.userRepository.saveNew(user);
  }
}
