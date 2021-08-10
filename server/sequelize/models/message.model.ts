import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Topic } from './topic.model';
import { User } from './user.model';

@Table({
  tableName: 'messages',
  modelName: 'Message'
})

class Message extends Model {
  @AllowNull(false)
  @Column(DataType.JSONB)
  text: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topicId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Topic)
  topic: Topic

  @BelongsTo(() => User)
  user: User
}

export { Message };
