import { injectable, inject } from 'tsyringe';
import { Prisma } from '@prisma/client';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({ id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError(
        400,
        "rental dons't exists",
        "this rental dons't exits"
      );
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError(400, "car dosn't exists", "this car dons't exits");
    }

    const minimum_daily = 1;

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * Number(car.fine_amount);
      total = calculate_fine;
    }

    total += daily * Number(car.daily_rate);

    rental.end_date = this.dateProvider.dateNow();
    rental.total = new Prisma.Decimal(total);

    await this.rentalsRepository.updateRental(rental.id, rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export default DevolutionRentalUseCase;
