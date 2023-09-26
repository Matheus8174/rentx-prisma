import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';

import { Rentals } from '@prisma/client';

interface IRentalsRepository {
  findOpenRentalByCar(caId: string): Promise<Rentals | null>;
  findOpenRentalByUser(userId: string): Promise<Rentals | null>;
  create(data: ICreateRentalDTO): Promise<Rentals>;
  findById(id: string): Promise<Rentals | null>;
  findAllByUser(userId: string): Promise<Rentals[]>;
  findByUser(userId: string): Promise<Rentals[]>;
  deleteRental(rentalId: string): Promise<void>;
  updateRental(rentalId: string, data: Rentals): Promise<void>;
}

export default IRentalsRepository;
