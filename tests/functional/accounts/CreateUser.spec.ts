import { faker } from '@faker-js/faker';
import { RequestBody } from '@modules/accounts/useCases/createUser/CreateUserController';

const prefix = process.env.PREFIX_ROUTES;

describe('#POST /users', () => {
  it('should be able to create a new user', async () => {
    const data: RequestBody = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      driver_license: faker.lorem.text(),
      password: faker.internet.password()
    };

    const response = await global.testRequest
      .post(`${prefix}/users`)
      .send(data);

    expect(response.status).toBe(201);
  });
});
