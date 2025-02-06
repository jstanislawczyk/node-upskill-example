import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private photoRepository: Repository<User>,
  ) {}

  public async getUserById(id: number): Promise<User | null> {
    return this.photoRepository.findOneBy({
      id,
    });
  }

  public async saveUser(user: User): Promise<User> {
    return this.photoRepository.save(user);
  }
}
