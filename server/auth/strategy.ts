import CookieStrategy from 'passport-cookie';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { API_CONSTANTS } from 'constants/apiConstants';
import { User } from '../sequelize/models/user.model';

dotenv.config();

const { API_SECRET } = process.env;

const cookieOptions = {
  cookieName: API_CONSTANTS.COOKIE_NAME
};

export const strategy = new CookieStrategy(cookieOptions, async (
  token: string, next: (a: null, b: { [k: string]: number } | boolean) => void
) => {
  const userPayload = jwt.verify(token, <jwt.Secret>API_SECRET, {
    issuer: API_CONSTANTS.ISSUER,
  });

  const { userId } = <Record<string, string>>userPayload;
  let user;

  try {
    user = await User.findByPk(userId);

    if (user) {
      return next(null, { id: user.id });
    }
  } catch (err) {
    console.error(err.message);
  }

  next(null, false);
});
