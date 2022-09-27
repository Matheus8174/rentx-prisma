import { faker } from '@faker-js/faker';

import CarsRepository from '@modules/cars/infra/prisma/repositories/CarsRepository';
import createCarFactory from 'tests/unit/helpers/createCarFactory';
import CreateCarUseCase, { IRequest } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;

let carsRepository: CarsRepository;

describe('#CreateCar', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository(global.prismaClientMocked);

    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const data: IRequest = {
      name: faker.vehicle.vehicle(),
      brand: faker.vehicle.manufacturer(),
      daily_rate: Number(faker.commerce.price()),
      description: faker.lorem.lines(1),
      license_plate: faker.vehicle.vrm(),
      category_id: faker.datatype.uuid(),
      fine_amount: Number(faker.commerce.price())
    };

    const car = createCarFactory();

    global.mockCtx.prisma.car.create.mockResolvedValue(car);

    expect(createCarUseCase.execute(data)).resolves.toEqual(car);
  });

  it('should not be able to create a car with a license plate already created', () => {
    const data: IRequest = {
      name: faker.vehicle.vehicle(),
      brand: faker.vehicle.manufacturer(),
      daily_rate: Number(faker.commerce.price()),
      description: faker.lorem.lines(1),
      license_plate: faker.vehicle.vrm(),
      category_id: faker.datatype.uuid(),
      fine_amount: Number(faker.commerce.price())
    };

    const car = createCarFactory();

    global.mockCtx.prisma.car.create.mockResolvedValue(car);

    jest.spyOn(carsRepository, 'findByLicensePlate').mockResolvedValue(car);

    expect(createCarUseCase.execute(data)).rejects.toHaveProperty(
      'message',
      'car already exists'
    );
  });
});
