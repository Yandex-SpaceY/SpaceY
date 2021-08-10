import { Request, Response } from 'express';

import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

export const getMessages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { topicId } = req.params;
  const limit = Number(req.params.limit) || 5;
  const page = Number(req.params.page) || 1;
  const offset = limit * (page - 1);

  try {
    const { count, rows } = await Message.findAndCountAll(
      {
        offset,
        limit,
        where: { topicId },
        order: [[ 'createdAt', 'DESC' ]],
        include: [
          {
            model: User,
            attributes: ['login'],
          }
        ],
      });

    return res.status(200).json({ payload: rows, totalRecords: count, skip: offset, limit });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
