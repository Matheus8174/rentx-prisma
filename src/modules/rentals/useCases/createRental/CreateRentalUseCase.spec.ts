import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

import RentalsRepository from '@modules/rentals/infra/prisma/repositories/RentalsRepository';
import DayjsDateProvider from '@shared/container/providers/DateProvider/DayjsDateProvider';
import AppError from '@shared/errors/AppError';
import CreateRentalUseCase from './CreateRentalUseCase';

import CarsRepository from '@modules/cars/infra/prisma/repositories/CarsRepository';
import createRentalFactory from '@tests/unit/helpers/createRentalFactory';
import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import createCarFactory from '@tests/unit/helpers/createCarFactory';

let createRentalUseCase: CreateRentalUseCase;

let carsRepository: CarsRepository;

describe('#CreateRental', () => {
  const addTwoDays = dayjs().add(2, 'day').toDate();

  beforeEach(async () => {
    const rentalsRepository = new RentalsRepository(global.prismaClientMocked);

    const dayjsDateProvider = new DayjsDateProvider();

    carsRepository = new CarsRepository(global.prismaClientMocked);

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository
    );
  });

  it('should be able to create a new rental', async () => {
    global.mockCtx.prisma.rentals.create.mockResolvedValue(
      createRentalFactory()
    );

    const rental = await createRentalUseCase.execute({
      userId: faker.datatype.uuid(),
      carId: faker.datatype.uuid(),
      expectedReturnDate: addTwoDays
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it("should not be able to create a new rental if there's another one open for the same user", async () => {
    const rental = createRentalFactory();

    global.mockCtx.prisma.rentals.create.mockResolvedValue(rental);

    const data: Omit<ICreateRentalDTO, 'carId'> = {
      userId: faker.datatype.uuid(),
      expectedReturnDate: addTwoDays
    };

    await createRentalUseCase.execute({
      ...data,
      carId: faker.datatype.uuid()
    });

    global.mockCtx.prisma.rentals.findFirst.mockResolvedValue(rental);

    expect(
      createRentalUseCase.execute({ ...data, carId: faker.datatype.uuid() })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's another one open for the same car", async () => {
    const rental = createRentalFactory();

    global.mockCtx.prisma.rentals.create.mockResolvedValue(rental);

    const data: Omit<ICreateRentalDTO, 'userId'> = {
      carId: faker.datatype.uuid(),
      expectedReturnDate: addTwoDays
    };

    await createRentalUseCase.execute({
      ...data,
      userId: faker.datatype.uuid()
    });

    global.mockCtx.prisma.rentals.findFirst.mockResolvedValue(rental);

    expect(
      createRentalUseCase.execute({ ...data, userId: faker.datatype.uuid() })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    const data: ICreateRentalDTO = {
      userId: faker.datatype.uuid(),
      carId: faker.datatype.uuid(),
      expectedReturnDate: dayjs().toDate()
    };

    expect(createRentalUseCase.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be false the available filed at cars after the rental be created', async () => {
    const { id: carId, ...data } = createCarFactory();

    global.mockCtx.prisma.car.findUnique.mockResolvedValue({
      ...data,
      id: carId,
      available: false
    });

    global.mockCtx.prisma.rentals.create.mockResolvedValue(
      createRentalFactory()
    );

    const rental = await createRentalUseCase.execute({
      userId: faker.datatype.uuid(),
      carId,
      expectedReturnDate: addTwoDays
    });

    const car = await carsRepository.findById(rental.car_id);

    expect(car?.available).toBe(false);
  });
});
