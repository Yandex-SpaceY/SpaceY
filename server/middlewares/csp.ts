import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import { Response, Request, NextFunction } from 'express';

import { HOST_URL } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { IS_DEV } from '../../webpack/constants';

const routes = Object.values(ROUTE_CONSTANTS);
const checkPage = (url: string) => (routes.some(route => url.includes(route) && route !== '/')) || url === '/';

export const nonce = (req: Request, res: Response, next: NextFunction): void => {
  if (checkPage(req.url)) {
    res.locals.cspNonce = Buffer.from(uuidv4()).toString('base64');
  }

  next();
};

export const csp = (req: Request, res: Response, next: NextFunction): void => {
  let middleware;

  if (checkPage(req.url)) {
    middleware
      = helmet({
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            scriptSrc: [ '\'self\'', (req, res) => `'nonce-${(<Response>res).locals.cspNonce}'`, IS_DEV ? '\'unsafe-eval\'' : '' ],
            connectSrc: [ '\'self\'', `${HOST_URL}` ],
            imgSrc: [ '\'self\'', `${HOST_URL}` ],
          },
        }
      });
  }

  middleware && middleware(req, res, next);
  next();
};
