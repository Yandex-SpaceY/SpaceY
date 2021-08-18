import path from 'path';
import React from 'react';
import { Helmet, HelmetData } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { StaticRouter } from 'react-router-dom';

import App from '../../src/App';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { store } from 'store/store';
import { TAppState } from 'store/types';
import { CLIENT_BUNDLE_NAME } from '../../webpack/constants';

let manifestData: string | null;

try {
  manifestData = fs.readFileSync(path.resolve(__dirname, 'manifest.json'), 'utf8');
} catch {
  manifestData = null;
}

const manifest: Record<string, string> | null = manifestData ? JSON.parse(manifestData) : null;

const styleFileName = manifest ? manifest[`${CLIENT_BUNDLE_NAME}.css`] : `/${CLIENT_BUNDLE_NAME}.css`;
const scriptFileName = manifest ? manifest[`${CLIENT_BUNDLE_NAME}.js`] : `/${CLIENT_BUNDLE_NAME}.js`;

const getHtml = (
  reactHtml: string,
  state: TAppState,
  helmetData: HelmetData,
  nonce: string,
): string => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
            <meta property="csp-nonce" content="${nonce}">
            <link rel="stylesheet" href="${styleFileName}">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script nonce="${nonce}">
              window.__INITIAL_STATE__ = ${JSON.stringify(state)}
            </script>
            <script nonce="${nonce}" src="${scriptFileName}"></script>
        </body>
      </html>
    `;

const serverRender = (
  req: Request,
  res: Response
): void => {
  const isPageAvailable = (Object.values(ROUTE_CONSTANTS) as string[]).includes(
    req.path
  );

  if (!isPageAvailable) req.url = ROUTE_CONSTANTS.NOT_FOUND;

  const location: string = req.url;

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactHtml = renderToString(jsx);
  const helmetData = Helmet.renderStatic();
  const pageIsAvailable = (Object.values(ROUTE_CONSTANTS) as string[]).includes(
    req.path
  );

  const state = store.getState();

  res
    .status(pageIsAvailable ? 200 : 404)
    .send(getHtml(reactHtml, state, helmetData, res.locals.cspNonce));
};

export default serverRender;
