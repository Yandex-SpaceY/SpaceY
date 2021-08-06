import { Router } from 'express';

import { addTopic, getTopics } from '../controllers/topicsController';

const topicsRoutes = Router();
topicsRoutes
  .post('/', addTopic)
  .get('/', getTopics);

export default topicsRoutes;
