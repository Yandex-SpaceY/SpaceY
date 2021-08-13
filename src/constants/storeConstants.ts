export enum USER_ACTIONS {
  AUTH = 'USER_AUTH',
  ALERT = 'USER_ALERT',
  CLEAR_USER_DATA = 'USER_CLEAR_USER_DATA',
  ERROR = 'USER_SET_ERROR',
  GET_USER_DATA_FROM_SERVER = 'USER_GET_USER_DATA_FROM_SERVER',
  LOGOUT = 'USER_LOGOUT',
  PENDING = 'USER_SET_PENDING',
  SET_IS_AUTH = 'USER_SET_IS_AUTH',
  SET_USER_DATA = 'USER_SET_USER_DATA',
  SET_USER_SETTINGS = 'USER_SET_USER_SETTINGS',
}

export enum GAME_ACTIONS {
  SET_IS_GAME_STARTED = 'GAME_SET_IS_GAME_STARTED',
  SET_IS_GAME_PAUSED = 'GAME_SET_IS_GAME_PAUSED',
  SET_IS_GAME_OVER = 'GAME_SET_IS_GAME_OVER',
  SET_IS_SOUND_ON = 'GAME_SET_IS_SOUND_ON',
  SET_IS_VIBRATION_ON = 'GAME_SET_IS_VIBRATION_ON',
  SET_LAST_SCORE = 'GAME_SET_LAST_SCORE',
}
