import { Car } from '@prisma/client';
import ICreateCarDTO from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
}

export default ICarsRepository;
