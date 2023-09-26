import { inject, injectable } from 'tsyringe';
import { Rentals } from '@prisma/client';

import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';

type Request = {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
};

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate
  }: Request): Promise<Rentals> {
    const userUnavailable = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (userUnavailable)
      throw new AppError(
        400,
        'users already rented',
        'this user already rented a car'
      );

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carUnavailable)
      throw new AppError(
        400,
        'car already rented',
        'this car has already been rented'
      );

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate
    );

    if (compare < 24) {
      throw new AppError(
        400,
        'return date too short',
        'this return date time is very short'
      );
    }

    const newRental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    });

    await this.carsRepository.updateAvailable(carId, false);

    return newRental;
  }
}

export default CreateRentalUseCase;
