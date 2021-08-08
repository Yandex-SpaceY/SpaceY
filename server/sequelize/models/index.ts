import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

import { User } from './user.model';
import { Setting } from './setting.model';
import { Topic } from './topic.model';
import { Message } from './message.model';

dotenv.config();

const { NODE_ENV, POSTGRES_URL = '', POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } = process.env;
const url = NODE_ENV === 'production'
  ? POSTGRES_URL
  : `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:54322/${POSTGRES_DB}`;

export const sequelize: Sequelize = new Sequelize(url, {
  dialectOptions: {
    ssl: {
      require: NODE_ENV === 'production',
      rejectUnauthorized: false
    }
  },
  models: [ Setting, User, Topic, Message ]
});
