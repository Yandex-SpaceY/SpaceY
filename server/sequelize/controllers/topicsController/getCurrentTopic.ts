import { Request, Response } from 'express';

import { Message } from '../../models/message.model';
import { Topic } from '../../models/topic.model';

export const getCurrentTopic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const offset = limit * (page - 1);

  try {
    const topic = await Topic.findAll({
      where: { id },
      include: [
        {
          model: Message,
          limit,
          // eslint-disable-next-line
          // @ts-ignore-next-line
          offset,
          distinct: true,
          order: [[ 'createdAt', 'DESC' ]],
        }
      ]
    });

    if (!topic.length) {
      return res.status(404).json({ error: 'No topic found' });
    }

    return res.status(200).json({ payload: topic[0], skip: offset, limit });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
