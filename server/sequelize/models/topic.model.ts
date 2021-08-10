import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Message } from './message.model';
import { User } from './user.model';

@Table({
  tableName: 'topics',
  modelName: 'Topic'
})

class Topic extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Message)
  messages: Message[]
}

export { Topic };
