import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUser } from './domain/new-user';

export interface UserServiceInject {
  getUserById(id: number): Promise<User | null>;
  saveUser(user: NewUser): Promise<User>;
}

@Injectable()
export class DatabaseUserService implements UserServiceInject {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  public async saveUser(user: NewUser): Promise<User> {
    return this.userRepository.save(user);
  }
}
