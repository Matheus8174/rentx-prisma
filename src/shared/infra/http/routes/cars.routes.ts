import { Router } from 'express';

import createCarController from '@modules/cars/useCases/createCar';

const carsRoutes = Router();

carsRoutes.post('/', createCarController);

export default carsRoutes;
