import { Router } from 'express';

import { findOrCreateUser, updateUser } from '../controllers/usersController';

const usersRoutes = Router();

usersRoutes
  .post('/', findOrCreateUser)
  .put('/', updateUser);

export default usersRoutes;
