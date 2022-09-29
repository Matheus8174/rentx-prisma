import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserUseCase from './CreateUserUseCase';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';

class CreateUserController {
  public async execute(request: Request, response: Response) {
    const { name, password, email, driver_license }: ICreateUserDTO =
      request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, password, email, driver_license });

    return response.status(201).end();
  }
}

export default CreateUserController;
