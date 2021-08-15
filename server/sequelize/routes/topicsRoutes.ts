import { Router } from 'express';

import { addTopic, getTopics, getCurrentTopic } from '../controllers/topicsController';

const topicsRoutes = Router();

topicsRoutes
  .post('/', addTopic)
  .get('/', getTopics)
  .get('/:id', getCurrentTopic);

export default topicsRoutes;
