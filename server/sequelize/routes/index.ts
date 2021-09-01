import { Router } from 'express';
import passport from 'passport';

import { strategy } from '../../auth/strategy';
import { authenticate } from '../../auth/authenticate';
import messagesRoutes from './messagesRoutes';
import settingsRoutes from './settingsRoutes';
import topicsRoutes from './topicsRoutes';
import usersRoutes from './usersRoutes';

const apiRoutes = Router();

passport.use(strategy);
apiRoutes
  .use(passport.initialize())
  .use('/auth', authenticate)
  .use(passport.authenticate('cookie', { session: false }))
  .use('/messages', messagesRoutes)
  .use('/settings', settingsRoutes)
  .use('/topics', topicsRoutes)
  .use('/users', usersRoutes);

export default apiRoutes;
