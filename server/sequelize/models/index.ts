import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

import { User } from './user.model';
import { Setting } from './setting.model';
import { Topic } from './topic.model';
import { Message } from './message.model';
import { IS_DEV } from '../../../webpack/constants';

dotenv.config();

const { POSTGRES_URL = '', POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_SSL } = process.env;
const url = IS_DEV
  ? `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:54322/${POSTGRES_DB}`
  : POSTGRES_URL;

let dialectOptions = {};

if (POSTGRES_SSL) {
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

export const sequelize: Sequelize = new Sequelize(url, {
  dialectOptions,
  models: [ Setting, User, Topic, Message ]
});
