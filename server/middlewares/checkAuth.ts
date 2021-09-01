import { Response, Request, NextFunction } from 'express';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  const publicRoutes = [ ROUTE_CONSTANTS.LOGIN, ROUTE_CONSTANTS.SIGNUP, ROUTE_CONSTANTS.NOT_FOUND ];
  const { cookies } = req;

  if (cookies?.includes('authCookie') && cookies?.includes('uuid')) {
    next();
  }

  if (!publicRoutes.includes(req.url)) {
    res.redirect(ROUTE_CONSTANTS.LOGIN);
  }
};
