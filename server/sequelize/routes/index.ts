import { Router } from 'express';

import messagesRoutes from './messagesRoutes';
import settingsRoutes from './settingsRoutes';
import topicsRoutes from './topicsRoutes';
import usersRoutes from './usersRoutes';

const apiRoutes = Router();
apiRoutes
  .use('/messages', messagesRoutes)
  .use('/settings', settingsRoutes)
  .use('/topics', topicsRoutes)
  .use('/users', usersRoutes);

export default apiRoutes;
