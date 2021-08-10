import { Request, Response } from 'express';

import { Topic } from '../../models/topic.model';

export const addTopic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;

  try {
    const topic = await Topic.create(body);

    return res.status(200).json({ payload: topic });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
