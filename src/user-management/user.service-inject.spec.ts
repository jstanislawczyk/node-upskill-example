import { Repository } from 'typeorm';
import { DatabaseUserService } from './user.service-inject';
import { User } from './user.entity';
import { NewUser } from './domain/new-user';

describe('UserServiceInject', () => {
  const findOneByMock = jest.fn();
  const saveMock = jest.fn();
  const userRepositoryMock = {
    findOneBy: findOneByMock,
    save: saveMock,
  } as unknown as Repository<User>;
  const userService = new DatabaseUserService(userRepositoryMock);
  const baseUser: NewUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@testmail.com",
  };

  describe('getUserById', () => {
    it('should call userRepository.findOneBy with the correct id', async () => {
      // Arrange
      const returnedUser: User = {
        id: 1,
        ...baseUser,
      };
      findOneByMock.mockResolvedValueOnce(returnedUser);

      // Act
      const result = await userService.getUserById(1);

      // Assert
      expect(result).toEqual(returnedUser);
    });

    it('should return null if the user is not found', async () => {
      // Arrange
      findOneByMock.mockResolvedValueOnce(null);

      // Act
      const result = await userService.getUserById(1);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw an error if the repository throws an error', async () => {
      // Arrange
      findOneByMock.mockRejectedValueOnce(new Error('Database error'));

      // Act
      const act = async () => await userService.getUserById(1);

      // Assert
      await expect(act).rejects.toThrow('Database error');
    });
  });

  describe('saveUser', () => {
    it('should call userRepository.save with the correct user', async () => {
      // Arrange
      saveMock.mockResolvedValueOnce({
        id: 1,
        ...baseUser,
      });

      // Act
      const result = await userService.saveUser(baseUser);

      // Assert
      expect(result).toEqual({
        id: 1,
        ...baseUser,
      });
    });
  });
})
