import { Request, Response } from 'express';

import { Setting } from '../../models/setting.model';

export const updateUsersSettings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, ...rest } = req.body;

  try {
    const settings = await Setting.update({ ...rest }, {
      where: { id },
      returning: true
    });

    return res.status(200).json({ payload: settings[1] });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
