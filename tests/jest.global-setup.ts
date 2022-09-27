import '../src/config/env';

import util from 'util';
import crypto from 'crypto';
import { exec } from 'child_process';

const prismaBinary = './node_modules/.bin/prisma';

declare global {
  // eslint-disable-next-line no-var
  var __SCHEMA__: string;
}

export default async () => {
  console.info('\nMontando suíte de testes...');

  const execSync = util.promisify(exec);

  global.__SCHEMA__ = `test_${crypto.randomUUID()}`;

  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${global.__SCHEMA__}`;

  await execSync(`${prismaBinary} migrate deploy`);

  console.info('Suíte pronta. Iniciando testes...\n');
};
