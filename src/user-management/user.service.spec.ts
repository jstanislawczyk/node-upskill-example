import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { NewUser } from './domain/new-user';
import { DatabaseUserService } from './user.service';

class HashMapUserRepository implements UserRepository {
  private users = new Map<number, User>();

  public async findById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  public async saveNew(user: NewUser): Promise<User> {
    const newUser = {
      id: this.users.size + 1,
      ...user,
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}

describe('UserService', () => {
  const userRepository = new HashMapUserRepository();
  const userService = new DatabaseUserService(userRepository);

  const baseUser: NewUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@testmail.com",
  }

  describe('saveUser', () => {
    it('should save the user and return it', async () => {
      // Act
      const result = await userService.saveUser(baseUser);

      // Assert
      expect(result).toEqual({
        id: 1,
        firstName: baseUser.firstName,
        lastName: baseUser.lastName,
        email: baseUser.email,
      });
    });
  });

  describe('getUserById', () => {
    it('should call userRepository.findOneBy with the correct id', async () => {
      // Arrange
      const savedUser = await userRepository.saveNew(baseUser);

      // Act
      const result = await userService.getUserById(savedUser.id);

      // Assert
      expect(result).toEqual({
        id: savedUser.id,
        firstName: baseUser.firstName,
        lastName: baseUser.lastName,
        email: baseUser.email,
      });
    });

    it('should return null if the user is not found', async () => {
      // Act
      const result = await userService.getUserById(111);

      // Assert
      expect(result).toBeNull();
    });
  });
});
