import { Router } from 'express';

import { updateUsersSettings } from '../controllers/settingsController';

const settingsRoutes = Router();

settingsRoutes
  .put('/', updateUsersSettings);

export default settingsRoutes;
