import { Car, PrismaClient } from '@prisma/client';
// import prismaClient from '@shared/infra/prisma/client';

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
}

export default CarsRepository;
