import supertest from 'supertest';

import app from '@shared/infra/http/app';
import prismaClient from '@shared/infra/prisma/client';

import deleteAllData from './functional/helpers/deleteAllData';

declare global {
  // eslint-disable-next-line no-var
  var testRequest: supertest.SuperTest<supertest.Test>;
}

beforeAll(async () => {
  global.testRequest = supertest(app);
});

afterEach(async () => {
  await deleteAllData(prismaClient);
});
