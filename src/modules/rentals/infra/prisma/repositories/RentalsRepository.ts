import { PrismaClient, Rentals } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
class RentalsRepository implements IRentalsRepository {
  constructor(
    @inject('PrismaClient')
    private prismaClient: PrismaClient
  ) {}

  async findOpenRentalByCar(caId: string): Promise<Rentals | null> {
    const rental = await this.prismaClient.rentals.findFirst({
      where: { car_id: caId }
    });

    return rental;
  }

  async findOpenRentalByUser(userId: string): Promise<Rentals | null> {
    const rental = await this.prismaClient.rentals.findFirst({
      where: { user_id: userId }
    });

    return rental;
  }

  async findById(id: string): Promise<Rentals | null> {
    const rental = await this.prismaClient.rentals.findUnique({
      where: { id }
    });

    return rental;
  }

  async findByUser(userId: string): Promise<Rentals[]> {
    const rentals = await this.prismaClient.rentals.findMany({
      where: { user_id: userId }
    });
    throw new Error('precisa melhorar');
    return rentals;
  }

  async create({
    carId,
    userId,
    expectedReturnDate
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = await this.prismaClient.rentals.create({
      data: {
        car_id: carId,
        user_id: userId,
        expected_return_date: expectedReturnDate
      }
    });

    return rental;
  }

  async deleteRental(rentalId: string) {
    await this.prismaClient.rentals.delete({ where: { id: rentalId } });
  }

  async updateRental(id: string, data: Rentals) {
    await this.prismaClient.rentals.update({ where: { id }, data });
  }

  async findAllByUser(userId: string): Promise<Rentals[]> {
    const manyRentals = await this.prismaClient.rentals.findMany({
      where: { user_id: userId }
    });

    console.log('H', manyRentals);

    return manyRentals;
  }
}

export default RentalsRepository;
