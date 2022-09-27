/* eslint-disable @typescript-eslint/naming-convention */
import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: number | string;
      PREFIX_ROUTES: string;

      JWT_SECRET: Secret;
      EXPIRES_IN: string | number;

      EXPIRES_REFRESH_TOKEN_DAYS: number;
      SECRET_REFRESH_TOKEN: Secret;
      EXPIRES_IN_REFRESH_TOKEN: string | number;

      DATABASE_URL: string;

      ADMIN_PASSWORD: string;
      ADMIN_EMAIL: string;

      FORGOT_MAIL_URL: string;
    }
  }
}
