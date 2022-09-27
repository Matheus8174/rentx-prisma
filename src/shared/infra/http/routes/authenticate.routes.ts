import { Router } from 'express';

import authenticateUserController from '@modules/accounts/useCases/authenticateUser';

const authenticateRoutes = Router();

authenticateRoutes.post('/', authenticateUserController);

export default authenticateRoutes;
