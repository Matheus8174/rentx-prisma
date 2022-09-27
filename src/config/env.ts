import { config } from 'dotenv-safe';
import { resolve } from 'path';

const isTestEnvFileToLoad =
  process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

config({
  path: resolve(__dirname, '..', '..', isTestEnvFileToLoad)
});
