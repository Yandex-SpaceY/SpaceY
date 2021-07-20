import React from 'react';
import { Helmet, HelmetData } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';

import App from '../../src/App';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { store } from '../../src/store/store';
import { TAppState } from '../../src/store/types';
import { CLIENT_BUNDLE_NAME } from '../../webpack/constants';

const getHtml = (
  reactHtml: string,
  state: TAppState,
  helmetData: HelmetData
): string => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="${CLIENT_BUNDLE_NAME}.css">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(state)}
            </script>
            <script src="/${CLIENT_BUNDLE_NAME}.js"></script>
        </body>
      </html>
    `;

const serverRender = (
  request: Request,
  response: Response
): void => {
  const location: string = request.url;

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
    request.path
  );

  const state = store.getState();

  response
    .status(pageIsAvailable ? 200 : 404)
    .send(getHtml(reactHtml, state, helmetData));
};

export default serverRender;
