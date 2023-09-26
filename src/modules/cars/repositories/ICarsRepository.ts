import { Car } from '@prisma/client';
import ICreateCarDTO from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  findById(carId: string): Promise<Car | null>;
  updateAvailable(carId: string, available: boolean): Promise<void>;
}

export default ICarsRepository;
