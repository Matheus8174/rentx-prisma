import { faker } from '@faker-js/faker';
import { IRequest } from '@modules/cars/useCases/createCar/CreateCarUseCase';
import prismaClient from '@shared/infra/prisma/client';

const prefix = process.env.PREFIX_ROUTES;

describe('#POST /cars', () => {
  it('should be able to create a new car', async () => {
    const category = await prismaClient.category.create({
      data: {
        name: faker.lorem.sentence(3),
        description: faker.lorem.sentence(5)
      }
    });

    const data: IRequest = {
      name: faker.vehicle.vehicle(),
      brand: faker.vehicle.manufacturer(),
      daily_rate: Number(faker.commerce.price()),
      description: faker.lorem.lines(1),
      license_plate: faker.vehicle.vrm(),
      category_id: category.id,
      fine_amount: Number(faker.commerce.price())
    };

    const response = await global.testRequest.post(`${prefix}/cars`).send(data);

    expect(response.status).toBe(201);
  });
});
