import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import { MockContext, createMockContext } from 'tests/mock/prisma';

declare global {
  // eslint-disable-next-line no-var
  var prismaClientMocked: PrismaClient;
  // eslint-disable-next-line no-var
  var mockCtx: MockContext;
}

beforeEach(() => {
  global.mockCtx = createMockContext();

  global.prismaClientMocked = mockCtx.prisma as PrismaClient;
});
