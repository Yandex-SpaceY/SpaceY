import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import dotenv from 'dotenv';

import { API_CONSTANTS } from 'constants/apiConstants';

dotenv.config();

export const authenticate = (req: Request, res: Response): void => {
  const { API_SECRET } = process.env;

  const token = jwt.sign({}, <jwt.Secret>API_SECRET+'', {
    issuer: API_CONSTANTS.ISSUER,
  });

  res.cookie(API_CONSTANTS.COOKIE_NAME, token).sendStatus(200);
};
