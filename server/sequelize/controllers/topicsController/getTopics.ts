import { Request, Response } from 'express';

import { Topic } from '../../models/topic.model';

export const getTopics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const offset = limit * (page - 1);

  try {
    const { count, rows } = await Topic.findAndCountAll({ limit, offset });

    return res.status(200).json({ payload: rows, totalRecords: count, skip: offset, limit });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
