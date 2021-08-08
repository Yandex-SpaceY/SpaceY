import { Router } from 'express';

import { addMessage, getMessages } from '../controllers/messagesController';

const messagesRoutes = Router();

messagesRoutes
  .post('/', addMessage)
  .get('/:topicId', getMessages);

export default messagesRoutes;
