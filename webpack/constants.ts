import path from 'path';

const IS_DEV = String(process.env.NODE_ENV).trim() === 'development';
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');
const SERVER_DIR = path.join(__dirname, '../server');
const CLIENT_BUNDLE_NAME = 'main';
const SERVER_BUNDLE_NAME = 'server';

const ALIAS = {
  api: `${SRC_DIR}/api`,
  components: `${SRC_DIR}/components`,
  constants: `${SRC_DIR}/constants`,
  pages: `${SRC_DIR}/pages`,
  router: `${SRC_DIR}/router`,
  utils: `${SRC_DIR}/utils`,
  style: `${SRC_DIR}/style`,
  images: `${SRC_DIR}/assets/images`,
  store: `${SRC_DIR}/store`,
  types: `${SRC_DIR}/types`,
  hocs: `${SRC_DIR}/hocs`,
  hooks: `${SRC_DIR}/hooks`,
  game: `${SRC_DIR}/game`,
  schemas: `${SRC_DIR}/schemas`,
};

export {
  ALIAS,
  CLIENT_BUNDLE_NAME,
  DIST_DIR,
  IS_DEV,
  SERVER_BUNDLE_NAME,
  SERVER_DIR,
  SRC_DIR,
};
