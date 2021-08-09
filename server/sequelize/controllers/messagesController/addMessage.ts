import { Request, Response } from 'express';

import { Message } from '../../models/message.model';

export const addMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;

  try {
    const topic = await Message.create(body);

    return res.status(200).json({ payload: topic });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
