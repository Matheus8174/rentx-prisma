import 'reflect-metadata';

import '@shared/container';

import express from 'express';

import swaggerUi from 'swagger-ui-express';
import routes from '@shared/infra/http/routes';
import handleError from '@shared/infra/http/middlewares/handleError';

import swaggerFile from '@doc/swagger.json';

const app = express();

app.use(express.json());

app.use(routes);

app.use(handleError);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
