import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

export interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(request: IRequest) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      request.license_plate
    );

    if (carAlreadyExists) throw new Error('car already exists');

    const car = await this.carsRepository.create(request);

    return car;
  }
}

export default CreateCarUseCase;
