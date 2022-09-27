import { faker } from '@faker-js/faker';
import { compare } from 'bcrypt';

import UsersRepository from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import CreateUserUseCase from './CreateUserUseCase';

let userRepository: UsersRepository;

let createUserUseCase: CreateUserUseCase;

describe('#CreateUser', () => {
  beforeEach(() => {
    userRepository = new UsersRepository(global.prismaClientMocked);

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should be able to create a new user', async () => {
    const data = {
      password: faker.internet.password(),
      id: faker.datatype.uuid(),
      driver_license: faker.lorem.text(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      avatar: faker.image.imageUrl(),
      created_at: new Date(),
      isAdmin: false
    };

    global.mockCtx.prisma.user.create.mockResolvedValue(data);

    const user = await createUserUseCase.execute(data);

    expect(user).toEqual({ ...data, password: user.password });
  });

  it('should not be able to create a user who already exists', async () => {
    const data = {
      id: faker.datatype.uuid(),
      password: faker.internet.password(),
      driver_license: faker.lorem.text(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      avatar: faker.image.imageUrl(),
      created_at: new Date(),
      isAdmin: false
    };

    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(data);

    expect(createUserUseCase.execute(data)).rejects.toBeInstanceOf(Error);

    expect(createUserUseCase.execute(data)).rejects.toThrowError(
      'User already exists'
    );
  });

  it('should encrypt the password when create an user', async () => {
    const data = {
      id: faker.datatype.uuid(),
      password: faker.internet.password(),
      driver_license: faker.lorem.text(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      avatar: faker.image.imageUrl(),
      created_at: new Date(),
      isAdmin: false
    };

    global.mockCtx.prisma.user.create.mockResolvedValue(data);

    const user = await createUserUseCase.execute(data);

    expect(compare(data.password, user.password)).resolves.toBe(true);
  });
});
