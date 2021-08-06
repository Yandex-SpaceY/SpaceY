import { Router } from 'express';

import { findOrCreateUser } from '../controllers/usersController';

const usersRoutes = Router();
usersRoutes
  .post('/', findOrCreateUser);

export default usersRoutes;
