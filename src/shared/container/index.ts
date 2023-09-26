import '@shared/container/providers';

import { container } from 'tsyringe';

import UsersRepository from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

import CarsRepository from '@modules/cars/infra/prisma/repositories/CarsRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
