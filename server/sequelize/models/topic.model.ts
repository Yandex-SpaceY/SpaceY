import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Message } from './message.model';
import { User } from './user.model';

@DefaultScope(() => ({
  attributes: {
    include: [
      [
        Sequelize.literal(
          '(SELECT COUNT(*) FROM "messages" WHERE "messages"."topicId" = "Topic"."id")'
        ), 'messagesCount'
      ]
    ]
  },
  include: [
    {
      model: User,
      attributes: [ 'login', 'avatar' ],
    }
  ],
  order: [[ 'createdAt', 'DESC' ]]
}))

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
