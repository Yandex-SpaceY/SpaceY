import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript';

import { SKILL_OPTIONS, THEME_OPTIONS } from 'constants/gameConstants';

import { User } from './user.model';

@Table({
  timestamps: false,
  tableName: 'settings',
  modelName: 'Setting'
})

class Setting extends Model {
  @AllowNull(false)
  @Default(THEME_OPTIONS.PRIMARY)
  @Column(DataType.STRING)
  theme: string;

  @AllowNull(false)
  @Default(SKILL_OPTIONS.FIRST_LEVEL)
  @Column(DataType.INTEGER)
  skill: number;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  sound: boolean;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  vibration: boolean;

  @HasOne(() => User)
  user: User
}

export { Setting };
