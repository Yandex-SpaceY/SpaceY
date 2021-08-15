import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Message } from './message.model';
import { Topic } from './topic.model';
import { Setting } from './setting.model';

@Table({
  timestamps: false,
  tableName: 'users',
  modelName: 'User'
})

class User extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  login: string;

  @ForeignKey(() => Setting)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  settingId: number;

  @Column(DataType.STRING)
  avatar: string;

  @BelongsTo(() => Setting)
  setting: Setting

  @HasMany(() => Topic)
  topics: Topic[]

  @HasMany(() => Message)
  messages: Message[]
}

export { User };
