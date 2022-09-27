import { Router } from 'express';

import createUserController from '@modules/accounts/useCases/createUser';

const usersRoutes = Router();

usersRoutes.post('/', createUserController);

export default usersRoutes;
