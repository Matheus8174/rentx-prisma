import { container } from 'tsyringe';

import prismaClient from '@shared/infra/prisma/client';

container.registerInstance('PrismaClient', prismaClient);
