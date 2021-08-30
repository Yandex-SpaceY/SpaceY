import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import dotenv from 'dotenv';

import { API_CONSTANTS } from 'constants/apiConstants';

dotenv.config();

export const authenticate = (req: Request, res: Response): void => {
  const { API_USER_PASSWORD, API_SECRET } = process.env;
  const { userId, password } = req.body;

  if (API_USER_PASSWORD !== password) {
    res.status(401).json({ error: API_CONSTANTS.INCORECT_PASSWORD });
  }

  const token = jwt.sign({ userId }, <jwt.Secret>API_SECRET, {
    issuer: API_CONSTANTS.ISSUER,
    expiresIn: 10000,
  });

  res.cookie(API_CONSTANTS.COOKIE_NAME, token).sendStatus(200);
};
