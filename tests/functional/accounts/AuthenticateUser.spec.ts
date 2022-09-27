import { faker } from '@faker-js/faker';
import UsersRepository from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import CreateUserUseCase, {
  ICreateUserData
} from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import prismaClient from '@shared/infra/prisma/client';

const prefix = process.env.PREFIX_ROUTES;

describe('#POST /session', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new UsersRepository(prismaClient);

    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const data: ICreateUserData = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      driver_license: faker.lorem.text(),
      password: faker.internet.password()
    };

    await createUserUseCase.execute(data);

    const response = await global.testRequest.post(`${prefix}/session`).send({
      email: data.email,
      password: data.password
    });

    expect(response.status).toBe(200);
  });
});
