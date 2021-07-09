export const GAME_SETTINGS = {
  OBJECT_SPRITES_PATH: './assets/sprites.png',
  MAIN_STAGE_BACKGROUND_PATH: './assets/bg.png',
  SPACESHIP_BASE_SPEED: 300,
  SPACESHIP_ENTITY_KEY: 'ship',
  OBSTACLE_BASE_SPEED: 100,
  OBSTACLES_ENTITIES_KEY: 'obstacles',
  WALL_BASE_SPEED: 100,
  WALLS_ENTITIES_KEY: 'walls',
  SHIP_HULL_STRENGTH: 100,
};

export enum GAME_KEYS {
  ESC = 'Escape',
  SPACEBAR = 'Space',
}

export const GAME_CONTROLS = {
  PAUSE: GAME_KEYS.ESC as string,
  SHIFT: GAME_KEYS.SPACEBAR as string
};
