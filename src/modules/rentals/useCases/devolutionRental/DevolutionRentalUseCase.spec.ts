import RentalsRepository from '@modules/rentals/infra/prisma/repositories/RentalsRepository';
import DayjsDateProvider from '@shared/container/providers/DateProvider/DayjsDateProvider';
import CarsRepository from '@modules/cars/infra/prisma/repositories/CarsRepository';

import DevolutionRentalUseCase from './DevolutionRentalUseCase';
import createRentalFactory from '@tests/unit/helpers/createRentalFactory';
import createCarFactory from '@tests/unit/helpers/createCarFactory';
import AppError from '@shared/errors/AppError';

let rentalsRepository: RentalsRepository;

let carsRepository: CarsRepository;

let devolutionRentalUseCase: DevolutionRentalUseCase;

describe('#DevolutionRental', () => {
  beforeAll(() => {
    const dayjsDateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepository(global.prismaClientMocked);
    carsRepository = new CarsRepository(global.prismaClientMocked);

    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository
    );
  });

  it('should be able to devolution a rental', async () => {
    const car = createCarFactory();
    const rental = createRentalFactory(car.id);

    global.mockCtx.prisma.rentals.findUnique.mockResolvedValue(rental);
    global.mockCtx.prisma.car.findUnique.mockResolvedValue(car);

    jest.spyOn(rentalsRepository, 'findById').mockResolvedValue(rental);
    jest.spyOn(rentalsRepository, 'updateRental').mockResolvedValue();
    jest.spyOn(carsRepository, 'findById').mockResolvedValue(car);
    jest.spyOn(carsRepository, 'updateAvailable').mockResolvedValue();

    await devolutionRentalUseCase.execute({ id: rental.id });

    expect(rental).toEqual(expect.objectContaining({ ...rental }));
    expect(Number(rental.total)).toBeGreaterThan(0);
  });

  it('should not be able to devolutio a rental', async () => {
    const car = createCarFactory();
    const rental = createRentalFactory(car.id);

    global.mockCtx.prisma.rentals.findUnique.mockResolvedValue(rental);
    global.mockCtx.prisma.car.findUnique.mockResolvedValue(car);

    jest.spyOn(rentalsRepository, 'findById').mockResolvedValue(null);

    expect(
      devolutionRentalUseCase.execute({ id: rental.id })
    ).rejects.toBeInstanceOf(AppError);
  });
});
