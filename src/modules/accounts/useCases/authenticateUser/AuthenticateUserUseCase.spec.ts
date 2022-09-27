import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import createUserFactory from 'tests/unit/helpers/createUserFactory';
import UsersRepository from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let userRepository: UsersRepository;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('#AuthenticateUser', () => {
  beforeEach(() => {
    userRepository = new UsersRepository(global.prismaClientMocked);

    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it('should be able to authenticate a user', async () => {
    const userAuthData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const user: User = await createUserFactory({ ...userAuthData });

    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(user);

    expect(typeof (await authenticateUserUseCase.execute(userAuthData))).toBe(
      'string'
    );
  });

  it('should not be able to autenticate an user with email wrong', async () => {
    const userAuthData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const user: User = await createUserFactory({ ...userAuthData });

    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(user);

    expect(
      authenticateUserUseCase.execute({
        email: userAuthData.email,
        password: faker.internet.password()
      })
    ).rejects.toThrowError('email and/or password dont match');
  });
});
