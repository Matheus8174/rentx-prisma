import { container } from 'tsyringe';

import DayjsDateProvider from '@shared/container/providers/DateProvider/DayjsDateProvider';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';

import prismaClient from '@shared/infra/prisma/client';

container.registerInstance('PrismaClient', prismaClient);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
