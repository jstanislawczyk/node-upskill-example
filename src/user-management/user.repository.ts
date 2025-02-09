import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NewUser } from './domain/new-user';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  saveNew(user: NewUser): Promise<User>;
}

export class DatabaseUserRepository extends Repository<User> implements UserRepository {
  public async findById(id: number): Promise<User | null> {
    return this.findOneBy({
      id,
    });
  }

  public async saveNew(user: NewUser): Promise<User> {
    return this.save(user);
  }
}
