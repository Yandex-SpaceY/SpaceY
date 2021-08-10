import { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import { Topic } from '../../models/topic.model';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

export const getTopics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const limit = Number(req.params.limit) || 5;
  const page = Number(req.params.page) || 1;
  const offset = limit * (page - 1);

  try {
    const { count, rows } = await Topic.findAndCountAll(
      {
        attributes: {
          include: [
            [
              Sequelize.literal(
                '(SELECT COUNT(*) FROM "messages" WHERE "messages"."topicId" = "Topic"."id")'
              ), 'messagesCount'
            ]
          ]
        },
        include: [
          {
            model: User,
            attributes: ['login'],
          },
          {
            model: Message,
            attributes: [],
          },
        ],
        offset,
        limit,
        distinct: true,
        order: [[ 'createdAt', 'DESC' ]]
      });

    return res.status(200).json({ payload: rows, totalRecords: count, skip: offset, limit });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
