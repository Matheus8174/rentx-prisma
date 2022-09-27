import { Request, Response } from 'express';
import { container } from 'tsyringe';

import type ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import CreateCarUseCase from './CreateCarUseCase';

class CreateCarController {
  public async execute(request: Request, response: Response) {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    }: ICreateCarDTO = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const carCreated = await createCarUseCase.execute({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate
    });

    return response.status(201).json(carCreated);
  }
}

export default CreateCarController;
