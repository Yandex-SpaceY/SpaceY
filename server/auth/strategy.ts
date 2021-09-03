import CookieStrategy from 'passport-cookie';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { API_CONSTANTS } from 'constants/apiConstants';

dotenv.config();

const { API_SECRET } = process.env;

const cookieOptions = {
  cookieName: API_CONSTANTS.COOKIE_NAME
};

export const strategy = new CookieStrategy(cookieOptions, (
  token: string, next: (a: null, b: boolean) => void
) => {
  try {
    jwt.verify(token, <jwt.Secret>API_SECRET + '', {
      issuer: API_CONSTANTS.ISSUER,
    });

    next(null, true);
  } catch (err) {
    next(null, false);
  }
});
