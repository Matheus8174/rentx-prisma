import { Car, PrismaClient } from '@prisma/client';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
class CarsRepository implements ICarsRepository {
  constructor(
    @inject('PrismaClient')
    private prismaClient: PrismaClient
  ) {}

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = await this.prismaClient.car.create({ data });

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.prismaClient.car.findFirst({
      where: { license_plate: licensePlate }
    });

    return car;
  }

  async findById(carId: string): Promise<Car | null> {
    const car = await this.prismaClient.car.findUnique({
      where: { id: carId }
    });

    return car;
  }

  async updateAvailable(carId: string, available: boolean): Promise<void> {
    await this.prismaClient.car.update({
      data: { available },
      where: { id: carId }
    });
  }
}

export default CarsRepository;
