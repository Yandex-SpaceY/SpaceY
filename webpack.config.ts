import { IS_DEV } from './webpack/constants';

import clientConfig from './webpack/client.config';
import serverConfig from './webpack/server.config';

const configs = [serverConfig];

if (!IS_DEV) {
  configs.push(clientConfig);
}

module.exports = configs;
