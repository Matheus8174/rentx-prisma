import { Router } from 'express';

import carsRoutes from './cars.routes';
import usersRoutes from './users.routes';
import authenticateRoutes from './authenticate.routes';

const routes = Router();

const prefixRoutes = process.env.PREFIX_ROUTES;

routes.use(`${prefixRoutes}/users`, usersRoutes);
routes.use(`${prefixRoutes}/cars`, carsRoutes);
routes.use(`${prefixRoutes}/session`, authenticateRoutes);

export default routes;
