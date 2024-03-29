import { Request, Response } from 'express';

import { sequelize } from '../../models';
import { User } from '../../models/user.model';
import { Setting } from '../../models/setting.model';

export const findOrCreateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, login } = req.body;
  let transaction;

  try {
    let user = await User.findByPk(id, {
      include: [Setting]
    });

    if (user) {
      return res.status(200).json({ payload: user });
    }

    transaction = await sequelize.transaction();
    const setting = await Setting.create({}, { transaction });
    user = await User.create({ id, login, settingId: setting.id }, { transaction });

    await transaction.commit();

    return res.status(200).json({ payload: { ...user.get({ plain: true }), setting } });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    return res.status(500).json({ error });
  }
};
