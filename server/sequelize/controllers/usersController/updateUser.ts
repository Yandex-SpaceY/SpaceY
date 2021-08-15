import { Request, Response } from 'express';

import { User } from '../../models/user.model';

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, ...rest } = req.body;

  try {
    const user = await User.update({ ...rest }, {
      where: { id }
    });

    return res.status(200).json({ payload: user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
